import { Inject, Injectable } from '@nestjs/common';
import { IEcoeStudentRepositoryOutPort } from 'src/competencies-ecoe/domain/repositories/ecoe-student.repository.out.port';

@Injectable()
export class GetStudentEcoeYearsUseCase {
    constructor(
        @Inject('IEcoeStudentRepositoryOutPort')
        private readonly ecoeStudentRepo: IEcoeStudentRepositoryOutPort,
    ) {}

    async execute(studentId: string): Promise<number[]> {
        const years = await this.ecoeStudentRepo.findEcoeYearsByStudentId(studentId);
        return years;
    }
}
