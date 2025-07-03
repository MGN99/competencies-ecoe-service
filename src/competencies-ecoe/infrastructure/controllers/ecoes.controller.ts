import { Body, ConflictException, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post } from '@nestjs/common';
import { AddStudentToEcoeDto } from '../dtos/add-student-to-ecoe.dto';
import { AddStudentToEcoeUseCase } from 'src/competencies-ecoe/application/use-cases/add-student-to-ecoe.use-case';
import { StudentAlreadyInEcoeError } from 'src/competencies-ecoe/domain/errors/student-already-in-ecoe.error';
import { GetStudentsByEcoeIdUseCase } from 'src/competencies-ecoe/application/use-cases/get-students-by-ecoe-id.use-case';
import { GetStudentsByEcoeIdDto } from '../dtos/get-students-by-ecoe-id.dto';
import { EcoeNotFoundError } from 'src/competencies-ecoe/domain/errors/ecoe-not-found.error';
import { EcoeStudentMapper } from '../mappers/ecoe-student.mapper';
import { GetEcoesByCycleUseCase } from 'src/competencies-ecoe/application/use-cases/get-ecoes-by-cycle.use-case';
import { GetEcoesByCycleDto } from '../dtos/get-ecoes-by-cycle.dto';
import { EcoeAlreadyExistsError } from 'src/competencies-ecoe/domain/errors/ecoe-already-exists.error';
import { AddEcoeUseCase } from 'src/competencies-ecoe/application/use-cases/add-ecoe.use-case';
import { AddEcoeDto } from '../dtos/add-ecoe.dto';
import { GetEcoesByCycleCurrentYearUseCase } from 'src/competencies-ecoe/application/use-cases/get-ecoes-by-cycle-current-year';
import { GetStudentsWithPendingEcoeByCycleUseCase } from 'src/competencies-ecoe/application/use-cases/get-students-with-pending-ecoe-by-cycle.use-case';
import { DeleteEcoeStudentByIdUseCase } from 'src/competencies-ecoe/application/use-cases/delete-ecoe-student-by-id.use-case';
import { DeleteEcoeStudentIdParamDto } from '../dtos/delete-ecoe-student-id.param.dto';
import { EcoeStudentNotFoundError } from 'src/competencies-ecoe/domain/errors/ecoe-student-not-found.error';
import { EvaluateStudentCompetencyDto } from '../dtos/evaluate-student-competency.dto';
import { EvaluateStudentCompetencyUseCase } from 'src/competencies-ecoe/application/use-cases/evaluate-student-competency.use-case';
import { AlreadyCompetencyEvaluatedError } from 'src/competencies-ecoe/domain/errors/already-competency-evaluated.error';
import { CompetencyNotFoundError } from 'src/competencies-ecoe/domain/errors/competency-not-found.error';
import { EcoeCycleNameParamDto } from '../dtos/ecoe-cycle-name.param.dto';
import { GetStudentsWithLastEcoeByEcoeCycleUseCase } from 'src/competencies-ecoe/application/use-cases/get-students-with-last-ecoe-by-cycle.usecase';
//import { EcoesLevelNotFoundError } from 'src/competencies-ecoe/domain/errors/ecoes-level-not-found.error';
//import { EcoeIdDto } from '../dtos/ecoe-id.dto';


@Controller('/api/v1/ecoes')
export class EcoesController {
    constructor(
        private readonly addStudentToEcoeUseCase: AddStudentToEcoeUseCase,
        private readonly getStudentsByEcoeIdUseCase: GetStudentsByEcoeIdUseCase,
        private readonly getEcoesByCycleUseCase: GetEcoesByCycleUseCase,
        private readonly addEcoeUseCase: AddEcoeUseCase,
        private readonly getEcoesByCycleCurrentYearUseCase: GetEcoesByCycleCurrentYearUseCase,
        private readonly getStudentsWithPendingEcoeByCycleUseCase: GetStudentsWithPendingEcoeByCycleUseCase,
        private readonly deleteEcoeStudentByIdUseCase: DeleteEcoeStudentByIdUseCase,
        private readonly evaluateStudentCompetencyUseCase: EvaluateStudentCompetencyUseCase,
        private readonly getStudentsWithLastEcoeByEcoeCycleUseCase: GetStudentsWithLastEcoeByEcoeCycleUseCase,
    ) { }


    @Get('by-cycle-current-year/:cycle')
    async getEcoesByCycleCurrentYear(@Param() data: EcoeCycleNameParamDto): Promise<any> {
        try {
            const ecoes = await this.getEcoesByCycleCurrentYearUseCase.execute(data.cycle);
            console.log(ecoes);
            return ecoes;
        } catch (error) {
            throw error;
        }
    }


    @Post('add-ecoe')
    @HttpCode(201)
    async addEcoe(@Body() data: AddEcoeDto) {
        try {
            console.log('Adding ECOE with data:', data);
            const newEcoe = await this.addEcoeUseCase.execute(data);
            console.log('New ECOE created:', newEcoe);
            return { message: 'ECOE added successfully', ecoe: newEcoe };

        }
        catch (error) {
            if (error instanceof EcoeAlreadyExistsError) {
                throw new ConflictException(error.message);
            }
            throw error;
        }
    }

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


    @Delete('ecoe-student/:id')
    async deleteEcoeStudent(@Param() param: DeleteEcoeStudentIdParamDto) {
        try {
            await this.deleteEcoeStudentByIdUseCase.execute(param.id);
            return { message: 'Student removed successfully from ECOE' };
        } catch (error) {
            if (error instanceof EcoeStudentNotFoundError) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }

    @Get('by-cycle/:cycle')
    async getEcoesByCycle(@Param() data: GetEcoesByCycleDto) {
        try {
            console.log('Fetching ECOEs for cycle:', data.cycle);
            const ecoes = await this.getEcoesByCycleUseCase.execute(data.cycle);
            console.log(ecoes);
            return ecoes;
        }
        catch (error) {
            throw error;
        }
    }

    @Get('students-last-by-cycle/:cycle')
    @HttpCode(HttpStatus.OK)
    async getStudentsWithLastEcoeByEcoeCycle(
        @Param() data: EcoeCycleNameParamDto,
    ) {
        try {
            const ecoeStudents = await this.getStudentsWithLastEcoeByEcoeCycleUseCase.execute(data.cycle);
            return ecoeStudents;

        } catch (error) {
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

    @Get('students-without-ecoe/:cycle')
    async getStudentsWithoutEcoeByCycle(@Param() data: GetEcoesByCycleDto) {
        try {
            const students = await this.getStudentsWithPendingEcoeByCycleUseCase.execute(data.cycle);
            return students;
        }
        catch (error) {
            throw error;
        }
    }

    @Post('evaluate-student-competency')
    async evaluateStudentCompetency(@Body() dto: EvaluateStudentCompetencyDto): Promise<void> {
        try {
            await this.evaluateStudentCompetencyUseCase.execute(dto);
        } catch (error) {
            if (error instanceof EcoeStudentNotFoundError) {
                throw new NotFoundException(error.message);
            }

            if (error instanceof CompetencyNotFoundError) {
                throw new NotFoundException(error.message);
            }

            throw error;
        }
    }
}