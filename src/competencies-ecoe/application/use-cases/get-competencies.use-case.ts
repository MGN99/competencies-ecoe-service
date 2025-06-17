import { Inject } from "@nestjs/common";
import { Competency } from "src/competencies-ecoe/domain/models/competency.entity";
import { ICompetencyRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/competency.repository.out.port";

export class GetCompetenciesUseCase {
    constructor(
        @Inject('ICompetencyRepositoryOutPort')
        private readonly competencyRepository: ICompetencyRepositoryOutPort,
    ) {}

    async execute(): Promise<Competency[]> {
        return this.competencyRepository.findAll();
    }
}