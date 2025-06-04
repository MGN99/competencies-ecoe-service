import { Competency } from "../models/competency.entity";

export interface ICompetencyRepositoryOutPort {
    findById(id: number): Promise<Competency | null>;
}