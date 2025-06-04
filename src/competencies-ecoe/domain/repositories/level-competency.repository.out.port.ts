import { LevelCompetency } from "../models/level-competency.entity";


export interface LevelCompetencyRepositoryOutPort {
    findManyByIds(ids: number[]): Promise<LevelCompetency[]>

    findByCompetencyId(competencyId: number): Promise<LevelCompetency[]>
}