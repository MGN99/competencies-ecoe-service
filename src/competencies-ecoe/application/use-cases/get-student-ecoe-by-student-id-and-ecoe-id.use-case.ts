import { Inject, Injectable } from '@nestjs/common';
import { StudentEcoeByYearDto } from '../dtos/student-ecoe-by-year.dto';
import { IEcoeStudentRepositoryOutPort } from 'src/competencies-ecoe/domain/repositories/ecoe-student.repository.out.port';

@Injectable()
export class GetStudentEcoeByStudentIdAndEcoeIdUseCase {
    constructor(
        @Inject('IEcoeStudentRepositoryOutPort')
        private readonly repositoryEcoeStudent: IEcoeStudentRepositoryOutPort,
    ) {}

    async execute(dto: StudentEcoeByYearDto): Promise<any> {
        const ecoeStudent = await this.repositoryEcoeStudent.findByStudentIdAndEcoeId(dto.studentId, dto.ecoeId);

        if (!ecoeStudent) {
            return {};
        }

        return ecoeStudent;
    }
}
