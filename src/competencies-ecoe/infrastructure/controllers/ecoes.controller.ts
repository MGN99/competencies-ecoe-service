import { Body, ConflictException, Controller, Get, HttpCode, NotFoundException, Param, Post } from '@nestjs/common';
import { AddStudentToEcoeDto } from '../dtos/add-student-to-ecoe.dto';
import { AddStudentToEcoeUseCase } from 'src/competencies-ecoe/application/use-cases/add-student-to-ecoe.use-case';
import { StudentAlreadyInEcoeError } from 'src/competencies-ecoe/domain/errors/student-already-in-ecoe.error';
import { GetStudentsByEcoeIdUseCase } from 'src/competencies-ecoe/application/use-cases/get-students-by-ecoe-id.use-case';
import { GetStudentsByEcoeIdDto } from '../dtos/get-students-by-ecoe-id.dto';
import { EcoeNotFoundError } from 'src/competencies-ecoe/domain/errors/ecoe-not-found.error';
import { EcoeStudentMapper } from '../mappers/ecoe-student.mapper';
import { GetEcoesByCycleUseCase } from 'src/competencies-ecoe/application/use-cases/get-ecoes-by-level.use-case';
import { GetEcoesByCycleDto } from '../dtos/get-ecoes-by-cycle.dto';
//import { EcoesLevelNotFoundError } from 'src/competencies-ecoe/domain/errors/ecoes-level-not-found.error';
//import { EcoeIdDto } from '../dtos/ecoe-id.dto';


@Controller('/api/v1/ecoes')
export class EcoesController {
    constructor(
        private readonly addStudentToEcoeUseCase: AddStudentToEcoeUseCase,
        private readonly getStudentsByEcoeIdUseCase: GetStudentsByEcoeIdUseCase,
        private readonly getEcoesByCycleUseCase: GetEcoesByCycleUseCase,
    ) { }

    @Post('add-student-to-ecoe')
    @HttpCode(201)
    async addStudentToEcoe(@Body() data: AddStudentToEcoeDto) {
        try {
            await this.addStudentToEcoeUseCase.execute(data);
            return { message: 'Student added successfully to current ECOE' };
        } catch (error) {
            if (error instanceof EcoeNotFoundError) {
                throw new NotFoundException(error.message);
            }

            if (error instanceof StudentAlreadyInEcoeError) {
                throw new ConflictException(error.message);
            }

            throw error;
        }
    }

    @Get('by-cycle/:cycle')
    async getEcoesByCycle(@Param() data: GetEcoesByCycleDto) {
        try {
            const ecoes = await this.getEcoesByCycleUseCase.execute(data.cycle);
            return ecoes;
        }
        catch (error) {
            throw error;
        }
    }

    @Get(':ecoeId/students')
    async getStudentsByEcoeId(@Param() data: GetStudentsByEcoeIdDto) {
        try {
            const ecoeStudents = await this.getStudentsByEcoeIdUseCase.execute(data.ecoeId);
            const ecoeStudentResponse = ecoeStudents.map(ecoeStudent => {
                return EcoeStudentMapper.toResponseDto(ecoeStudent);
            });

            return ecoeStudentResponse;
        } catch (error) {
            if (error instanceof EcoeNotFoundError) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }
}