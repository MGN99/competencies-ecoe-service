import { Injectable, Inject } from '@nestjs/common';
import { StudentCompetencyRepository } from '../interfaces/student-competency.repository.interface';
import { CompetenciesBySubjectDto } from '../dtos/competencies-by-subject.dto';

@Injectable()
export class GetCompetenciesBySubjectUseCase {
  constructor(
    @Inject('StudentCompetencyRepository')
    private readonly repository: StudentCompetencyRepository,
  ) {}

  async execute(dto: CompetenciesBySubjectDto): Promise<any[]> {
    return this.repository.findBySubject(dto.subjectId);
  }
}