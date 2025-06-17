import { Inject, Injectable } from '@nestjs/common';
import { LevelCompetency } from 'src/competencies-ecoe/domain/models/level-competency.entity';
import { ILevelCompetencyRepositoryOutPort } from 'src/competencies-ecoe/domain/repositories/level-competency.repository.out.port';

@Injectable()
export class GetCompetenciesLevelByIdsUseCase {
    constructor(
        @Inject('ILevelCompetencyRepositoryOutPort')
        private readonly levelCompetencyRepo: ILevelCompetencyRepositoryOutPort,
    ) {}

    async execute(competenciesLevelIds: number[]): Promise<LevelCompetency[]> {
        if (!competenciesLevelIds || competenciesLevelIds.length === 0) {
            return [];
        }
        const levelsCompetencies = await this.levelCompetencyRepo.findManyByIds(competenciesLevelIds);
        return levelsCompetencies;
    }
}
