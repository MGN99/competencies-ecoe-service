import { Inject, Injectable } from '@nestjs/common';
import { LevelCompetencyRepositoryOutPort } from 'src/competencies-ecoe/domain/repositories/level-competency.repository.out.port';

@Injectable()
export class GetLevelCompetencyIdsByCompetencyIdUseCase {
    constructor(
        @Inject('LevelCompetencyRepositoryOutPort')
        private readonly levelCompetencyRepository: LevelCompetencyRepositoryOutPort
    ) {}

    async execute(competencyId: number): Promise<number[]> {
        const levels = await this.levelCompetencyRepository.findByCompetencyId(competencyId);
        return levels.map(level => level.id);
    }
}
