import { Body, ConflictException, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { GetAvailableEcoesUseCase } from 'src/competencies-ecoe/application/use-cases/get-ecoes-availables.use-case';
import { AddStudentToEcoeDto } from '../dtos/add-student-to-ecoe.dto';
import { AddStudentToEcoeCurrentYearUseCase } from 'src/competencies-ecoe/application/use-cases/add-student-to-ecoe-current-year.use-case';
import { StudentAlreadyInEcoeYearError } from 'src/competencies-ecoe/domain/errors/student-already-in-ecoe-year.error';


@Controller('/api/v1/ecoes')
export class EcoesController {
  constructor(
    private readonly getAvailableEcoesUseCase: GetAvailableEcoesUseCase,
    private readonly addStudentToEcoeCurrentYearUseCase: AddStudentToEcoeCurrentYearUseCase,
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
}