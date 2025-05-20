import { Injectable, Inject } from '@nestjs/common';
import { IStudentCompetencyRepositoryOutPort } from '../../domain/repositories/student-competency.repository.out.port';
import { CompetenciesBySubjectDto } from '../dtos/competencies-by-subject.dto';

@Injectable()
export class GetCompetenciesBySubjectUseCase {
  constructor(
    @Inject('IStudentCompetencyRepositoryOutPort')
    private readonly repositoryStudentCompetency: IStudentCompetencyRepositoryOutPort,
  ) {}

  async execute(dto: CompetenciesBySubjectDto): Promise<any[]> {
    return this.repositoryStudentCompetency.findBySubject(dto.subjectId);
  }
}