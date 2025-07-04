import { Inject, Injectable } from '@nestjs/common';
import { IEcoeStudentRepositoryOutPort } from 'src/competencies-ecoe/domain/repositories/ecoe-student.repository.out.port';

@Injectable()
export class DeleteEcoeStudentByStudentIdUseCase {
    constructor(
        @Inject('IEcoeStudentRepositoryOutPort')
        private readonly ecoeStudentRepo: IEcoeStudentRepositoryOutPort,
    ) { }

    async execute(studentId: string): Promise<void> {
        await this.ecoeStudentRepo.deleteAllByStudentId(studentId);
    }
}
