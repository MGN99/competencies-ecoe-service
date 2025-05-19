import { Inject, Injectable } from '@nestjs/common';
import { StudentCompetencyRepository } from '../interfaces/student-competency.repository.interface';
import { StudentCompetenciesByEcoeYearDto } from '../dtos/student-competencies-by-ecoe-year.dto';

@Injectable()
export class GetStudentCompetenciesByEcoeYearUseCase {
  constructor(
    @Inject('StudentCompetencyRepository')
    private readonly repository: StudentCompetencyRepository,
  ) {}

  async execute(dto: StudentCompetenciesByEcoeYearDto): Promise<any[]> {
    return this.repository.findByStudentAndEcoeYear(dto.studentId, dto.ecoeYear);
  }
}