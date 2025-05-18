import { Injectable, Inject } from '@nestjs/common';
import { StudentCompetencyRepository } from '../interfaces/student-competency.repository.interface';
import { GetCompetenciesBySubjectDto } from '../dtos/get-competencies-by-subject.dto';

@Injectable()
export class GetCompetenciesByCourseUseCase {
  constructor(
    @Inject('StudentCompetencyRepository')
    private readonly repository: StudentCompetencyRepository,
  ) {}

  async execute(dto: GetCompetenciesBySubjectDto): Promise<any[]> {
    return this.repository.findBySubject(dto.subjectId);
  }
}