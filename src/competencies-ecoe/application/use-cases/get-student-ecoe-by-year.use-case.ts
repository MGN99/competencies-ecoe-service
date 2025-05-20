import { Inject, Injectable } from '@nestjs/common';
import { IStudentCompetencyRepositoryOutPort } from '../../domain/repositories/student-competency.repository.out.port';
import { StudentEcoeByYearDto } from '../dtos/student-ecoe-by-year.dto';
import { IEcoeStudentRepositoryOutPort } from 'src/competencies-ecoe/domain/repositories/ecoe-student-repository.out.port';

@Injectable()
export class GetStudentEcoeByYearUseCase {
  constructor(
    @Inject('IEcoeStudentRepositoryOutPort')
    private readonly repositoryEcoeStudent: IEcoeStudentRepositoryOutPort,

    @Inject('IStudentCompetencyRepositoryOutPort')
    private readonly repositoryStudentCompetency: IStudentCompetencyRepositoryOutPort,
  ) {}

  async execute(dto: StudentEcoeByYearDto): Promise<any> {
    const ecoeStudent = await this.repositoryEcoeStudent.findByStudentIdAndEcoeYear(dto.studentId, dto.ecoeYear);

    if (!ecoeStudent) {
      return {};
    }

    return ecoeStudent;
  }
}
