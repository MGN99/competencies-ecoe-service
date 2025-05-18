import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetStudentCompetenciesByEcoeYearUseCase } from '../../application/use-cases/get-student-competencies-by-ecoe-year.use-case';
import { GetStudentCompetenciesByEcoeYearDto } from '../../application/dtos/get-student-competencies-by-ecoe-year.dto';
import { GetCompetenciesByCourseUseCase } from '../../application/use-cases/get-competencies-by-course.use-case';
import { GetCompetenciesBySubjectDto } from '../../application/dtos/get-competencies-by-subject.dto';

@Controller('competencies')
export class CompetencieController {
  constructor(
    private readonly getStudentCompetenciesByEcoeYearUseCase: GetStudentCompetenciesByEcoeYearUseCase,
    private readonly getCompetenciesByCourseUseCase: GetCompetenciesByCourseUseCase,
  ) {}

  @MessagePattern('get_student_competencies_by_ecoe_year')
  async getStudentCompetenciesByEcoeYear(
    @Payload() data: GetStudentCompetenciesByEcoeYearDto,
  ) {
    return this.getStudentCompetenciesByEcoeYearUseCase.execute(data);
  }

  @MessagePattern('get_competencies_by_course')
  async getCompetenciesByCourse(
    @Payload() data: GetCompetenciesBySubjectDto,
  ) {
    return this.getCompetenciesByCourseUseCase.execute(data);
  }
}