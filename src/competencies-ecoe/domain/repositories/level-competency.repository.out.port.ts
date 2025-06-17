import { LevelCompetency } from "../models/level-competency.entity";


export interface ILevelCompetencyRepositoryOutPort {
    findOneById(id: number): Promise<LevelCompetency | null>

    findManyByIds(ids: number[]): Promise<LevelCompetency[]>

    findByCompetencyId(competencyId: number): Promise<LevelCompetency[]>

    save(levelCompetency: LevelCompetency): Promise<LevelCompetency>
}