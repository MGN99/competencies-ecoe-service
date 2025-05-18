import { Inject, Injectable } from '@nestjs/common';
import { StudentCompetencyRepository } from '../interfaces/student-competency.repository.interface';
import { GetStudentCompetenciesByEcoeYearDto } from '../dtos/get-student-competencies-by-ecoe-year.dto';

@Injectable()
export class GetStudentCompetenciesByEcoeYearUseCase {
  constructor(
    @Inject('StudentCompetencyRepository')
    private readonly repository: StudentCompetencyRepository,
  ) {}

  async execute(dto: GetStudentCompetenciesByEcoeYearDto): Promise<any[]> {
    return this.repository.findByStudentAndEcoeYear(dto.studentId, dto.year);
  }
}