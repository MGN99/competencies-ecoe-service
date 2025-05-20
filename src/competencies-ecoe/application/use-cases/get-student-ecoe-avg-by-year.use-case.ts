import { Inject, Injectable } from '@nestjs/common';
import { IEcoeStudentRepositoryOutPort } from 'src/competencies-ecoe/domain/repositories/ecoe-student-repository.out.port';
import { StudentEcoeCompetenciesAvgByYearDto } from '../dtos/student-ecoe-avg-by-year.dto';

@Injectable()
export class GetStudentEcoeCompetenciesAvgByYearUseCase {
    constructor(
        @Inject('IEcoeStudentRepositoryOutPort')
        private readonly repositoryEcoeStudent: IEcoeStudentRepositoryOutPort
    ) {}
    async execute(dto: StudentEcoeCompetenciesAvgByYearDto): Promise<{ average: number }> {
        const ecoeStudent = await this.repositoryEcoeStudent.findByStudentIdAndEcoeYear(dto.studentId, dto.ecoeYear);
        if (!ecoeStudent || ecoeStudent.competenciesEvaluated || ecoeStudent.competenciesEvaluated.length === 0) {
            return { average: 0 };
        }
        const sum = ecoeStudent.competenciesEvaluated.reduce((acc, competency) => acc + (competency.grade ?? 0), 0);
        const average = sum / ecoeStudent.competenciesEvaluated.length;
    }
}