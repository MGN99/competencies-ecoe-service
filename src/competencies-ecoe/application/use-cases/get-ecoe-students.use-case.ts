import { Inject } from "@nestjs/common";
import { EcoeNotFoundError } from "src/competencies-ecoe/domain/errors/ecoe-not-found.error";
import { EcoeStudent } from "src/competencies-ecoe/domain/models/ecoe-student.entity";
import { IEcoeStudentRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe-student.repository.out.port";
import { IEcoeRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe.repository.out.port";

export class GetEcoeStudentsUseCase {
    constructor(
        @Inject('IEcoeStudentRepositoryOutPort')
        private readonly ecoeStudentRepository: IEcoeStudentRepositoryOutPort,
        @Inject('IEcoeRepositoryOutPort')
        private readonly ecoeRepository: IEcoeRepositoryOutPort,
    ) {}

    async execute(ecoeId: number): Promise<EcoeStudent[]> {
        const ecoe = await this.ecoeRepository.findById(ecoeId);
        if (!ecoe) {
            throw new EcoeNotFoundError(ecoeId);
        }

        return this.ecoeStudentRepository.findStudentsByEcoeId(ecoeId);
    }
}