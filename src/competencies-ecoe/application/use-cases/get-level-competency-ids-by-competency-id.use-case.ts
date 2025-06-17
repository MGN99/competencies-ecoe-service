import { Inject, Injectable } from '@nestjs/common';
import { ILevelCompetencyRepositoryOutPort } from 'src/competencies-ecoe/domain/repositories/level-competency.repository.out.port';

@Injectable()
export class GetLevelCompetencyIdsByCompetencyIdUseCase {
    constructor(
        @Inject('ILevelCompetencyRepositoryOutPort')
        private readonly levelCompetencyRepository: ILevelCompetencyRepositoryOutPort
    ) {}

    async execute(competencyId: number): Promise<number[]> {
        const levels = await this.levelCompetencyRepository.findByCompetencyId(competencyId);
        return levels.map(level => level.id);
    }
}
