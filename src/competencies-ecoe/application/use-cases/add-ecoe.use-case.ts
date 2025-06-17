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


    //ecoe -> BASIC 2022, 2
    //ecoe -> INTERMEDIO 2022, 2
    async execute(data: AddEcoeCommand): Promise<Ecoe> {
        const ecoe = await this.ecoeRepository.findOneByCycleSemesterYear(
            data.cycle,
            data.semester,
            data.year,
        );

        if (ecoe) {
            throw new EcoeAlreadyExistsError(data.cycle, data.semester, data.year);
        }

        console.log('Creating new ECOE with data:', data);
        const createEcoe = new Ecoe(
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

