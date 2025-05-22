import { Inject, Injectable } from '@nestjs/common';
import { LevelCompetency } from 'src/competencies-ecoe/domain/models/level-competency.entity';
import { LevelCompetencyRepositoryOutPort } from 'src/competencies-ecoe/domain/repositories/level-competency.repository.out.port';

@Injectable()
export class GetCompetenciesLevelByIdsUseCase {
    constructor(
        @Inject('LevelCompetencyRepositoryOutPort')
        private readonly levelCompetencyRepo: LevelCompetencyRepositoryOutPort,
    ) {}

    async execute(competenciesLevelIds: number[]): Promise<LevelCompetency[]> {
        if (!competenciesLevelIds || competenciesLevelIds.length === 0) {
            return [];
        }
        const levelsCompetencies = await this.levelCompetencyRepo.findManyByIds(competenciesLevelIds);
        return levelsCompetencies;
    }
}
