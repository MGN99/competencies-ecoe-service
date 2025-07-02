import { Inject } from "@nestjs/common";
import { EcoeNotFoundError } from "src/competencies-ecoe/domain/errors/ecoe-not-found.error";
import { EcoeStudent } from "src/competencies-ecoe/domain/models/ecoe-student.entity";
import { IEcoeStudentRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe-student.repository.out.port";
import { IEcoeRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe.repository.out.port";

export class GetStudentsByEcoeIdUseCase {
    constructor(
        @Inject('IEcoeRepositoryOutPort')
        private readonly ecoeRepository: IEcoeRepositoryOutPort,

        @Inject('IEcoeStudentRepositoryOutPort')
        private readonly ecoeStudentRepository: IEcoeStudentRepositoryOutPort,
    ) {}

    async execute(ecoeId: number): Promise<EcoeStudent[]> {
        const ecoe = await this.ecoeRepository.findOneById(ecoeId);

        if (!ecoe) {
            throw new EcoeNotFoundError(ecoeId);
        }

        const ecoeStudents = await this.ecoeStudentRepository.findStudentsByEcoeId(ecoeId);

        return ecoeStudents;        
    }
}