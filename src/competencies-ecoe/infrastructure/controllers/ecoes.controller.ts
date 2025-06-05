import { Body, ConflictException, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { GetAvailableEcoesUseCase } from 'src/competencies-ecoe/application/use-cases/get-ecoes-availables.use-case';
import { AddStudentToEcoeDto } from '../dtos/add-student-to-ecoe.dto';
import { AddStudentToEcoeCurrentYearUseCase } from 'src/competencies-ecoe/application/use-cases/add-student-to-ecoe-current-year.use-case';
import { StudentAlreadyInEcoeYearError } from 'src/competencies-ecoe/domain/errors/student-already-in-ecoe-year.error';
import { GetEcoeStudentsUseCase } from 'src/competencies-ecoe/application/use-cases/get-ecoe-students.use-case';
import { GetStudentsByEcoeIdDto } from '../dtos/get-students-by-ecoe-id.dto';
import { EcoeNotFoundError } from 'src/competencies-ecoe/domain/errors/ecoe-not-found.error';
import { EcoeStudentMapper } from '../mappers/ecoe-student.mapper';


@Controller('/api/v1/ecoes')
export class EcoesController {
  constructor(
    private readonly getAvailableEcoesUseCase: GetAvailableEcoesUseCase,
    private readonly addStudentToEcoeCurrentYearUseCase: AddStudentToEcoeCurrentYearUseCase,
    private readonly getEcoeStudentsUseCase: GetEcoeStudentsUseCase,
) {}

  @Get('available')
  async getAvailableEcoes() {
    return this.getAvailableEcoesUseCase.execute();
  }

  @Post('add-student-to-ecoe')
  @HttpCode(201)
  async addStudentToEcoe(@Body() data: AddStudentToEcoeDto) {
    try {
      await this.addStudentToEcoeCurrentYearUseCase.execute(data);
      return { message: 'Student added successfully to current ECOE' };
    } catch (error) {
      if (error instanceof StudentAlreadyInEcoeYearError) {
        throw new ConflictException(error.message);
      }

      throw error;
    }
    }

    @Get(':ecoeId/students')
    async getStudentsByEcoeId(@Param() data: GetStudentsByEcoeIdDto) {
        try {
            const ecoeStudents = await this.getEcoeStudentsUseCase.execute(data.ecoeId);
            const ecoeStudentResponse = ecoeStudents.map(ecoeStudent => {
                return EcoeStudentMapper.toResponseDto(ecoeStudent);
            });
            
            return ecoeStudentResponse;
        } catch (error) {
            if (error instanceof EcoeNotFoundError) {
                throw new ConflictException(error.message);
            }
            throw error;
        }
    }
}