import { Inject, Injectable } from '@nestjs/common';
import { IEcoeStudentRepositoryOutPort } from 'src/competencies-ecoe/domain/repositories/ecoe-student.repository.out.port';
import { StudentEcoeCompetenciesAvgByEcoeIdDto } from '../dtos/student-ecoe-avg-by-ecoe-id.dto';

@Injectable()
export class GetStudentEcoeCompetenciesAvgByEcoeIdUseCase {
    constructor(
        @Inject('IEcoeStudentRepositoryOutPort')
        private readonly repositoryEcoeStudent: IEcoeStudentRepositoryOutPort,
    ) { }

    async execute(dto: StudentEcoeCompetenciesAvgByEcoeIdDto): Promise<{ average: number }> {
        const ecoeStudent = await this.repositoryEcoeStudent.findByStudentIdAndEcoeId(dto.studentId, dto.ecoeId);

        if (!ecoeStudent || !Array.isArray(ecoeStudent.competenciesEvaluated) || ecoeStudent.competenciesEvaluated.length === 0) {
            return { average: 0 };
        }

        const sum = ecoeStudent.competenciesEvaluated.reduce(
            (acc, competency) => acc + (competency.grade ?? 0),
            0,
        );

        const average = sum / ecoeStudent.competenciesEvaluated.length;
        return { average };
    }
}
