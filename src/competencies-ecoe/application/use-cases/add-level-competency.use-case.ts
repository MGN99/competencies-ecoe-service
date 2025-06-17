import { Inject } from "@nestjs/common";
import { LevelCompetency } from "src/competencies-ecoe/domain/models/level-competency.entity";
import { ILevelCompetencyRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/level-competency.repository.out.port";
import { LevelCompetencyCommand } from "../commands/level-competency.command";
import { ICompetencyRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/competency.repository.out.port";
import { CompetencyNotFoundError } from "src/competencies-ecoe/domain/errors/competency-not-found.error";

export class AddLevelCompetencyUseCase {
    constructor(
        @Inject('ILevelCompetencyRepositoryOutPort')
        private readonly levelCompetencyRepository: ILevelCompetencyRepositoryOutPort,

        @Inject('ICompetencyRepositoryOutPort')
        private readonly competencyRepository: ICompetencyRepositoryOutPort,
    ) { }

    async execute(levelCompetencyCommand: LevelCompetencyCommand): Promise<LevelCompetency> {
        const competency = await this.competencyRepository.findOneById(levelCompetencyCommand.competencyId);

        if (!competency) {
            throw new CompetencyNotFoundError(levelCompetencyCommand.competencyId);
        }

        const levelCompetency = new LevelCompetency(
            undefined,
            competency,
            levelCompetencyCommand.level,
            levelCompetencyCommand.description,
        );

        return await this.levelCompetencyRepository.save(levelCompetency);
    }
}