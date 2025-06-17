import { Inject } from "@nestjs/common";
import { EcoeNotFoundError } from "src/competencies-ecoe/domain/errors/ecoe-not-found.error";
import { Ecoe } from "src/competencies-ecoe/domain/models/ecoe.entity";
import { IEcoeRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe.repository.out.port";

export class GetEcoeByIdUseCase {
    constructor(
        @Inject('IEcoeRepositoryOutPort')
        private readonly ecoeRepository: IEcoeRepositoryOutPort,
    ) { }

    async execute(ecoeId: number): Promise<Ecoe> {
        const ecoe = await this.ecoeRepository.findOneById(ecoeId);

        if (!ecoe) {
            throw new EcoeNotFoundError(ecoeId);
        }

        return ecoe;
    }
}