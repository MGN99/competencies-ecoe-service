import { Inject } from "@nestjs/common";
import { EcoeStudentNotFoundError } from "src/competencies-ecoe/domain/errors/ecoe-student-not-found.error";
import { IEcoeStudentRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe-student.repository.out.port";

export class DeleteEcoeStudentByIdUseCase {
    constructor(
        @Inject('IEcoeStudentRepositoryOutPort')
        private readonly ecoeStudentRepository: IEcoeStudentRepositoryOutPort,
    ) {}

    async execute(id: number): Promise<void> {
        const ecoeStudent = this.ecoeStudentRepository.findOneById(id);
        
        if (!ecoeStudent) {
            throw new EcoeStudentNotFoundError(id);
        }

        await this.ecoeStudentRepository.delete(id);
    }
}