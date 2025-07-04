import { Inject, Injectable } from "@nestjs/common";
import { Ecoe } from "src/competencies-ecoe/domain/models/ecoe.entity";
import { IEcoeRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe.repository.out.port";


@Injectable()
export class GetEcoesUseCase {
    constructor(
        @Inject("IEcoeRepositoryOutPort")
        private readonly ecoeRepository: IEcoeRepositoryOutPort,
    ) { }

    async execute(): Promise<Ecoe[]> {
        return await this.ecoeRepository.findAll();
    }
}