import { Inject } from "@nestjs/common";
import { Ecoe } from "src/competencies-ecoe/domain/models/ecoe.entity";
import { IEcoeRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe.repository.out.port";
import { AddEcoeCommand } from "../commands/add-ecoe.command";
import { EcoeAlreadyExistsError } from "src/competencies-ecoe/domain/errors/ecoe-already-exists.error";

export class AddEcoeUseCase {
    constructor(
        @Inject("IEcoeRepositoryOutPort")
        private readonly ecoeRepository: IEcoeRepositoryOutPort,
    ) { }

    async execute(data: AddEcoeCommand): Promise<Ecoe> {
        const ecoe = await this.ecoeRepository.findOneBySemesterAndYear(
            data.semester,
            data.year,
        );

        if (ecoe) {
            throw new EcoeAlreadyExistsError(data.year, data.semester);
        }

        const createEcoe = new Ecoe(
            undefined,
            data.name,
            data.cycle,
            data.semester,
            data.year,
            data.description,
        );

        const newEcoe = await this.ecoeRepository.save(createEcoe);

        return newEcoe;
    }
}

