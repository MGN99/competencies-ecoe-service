import { Competency } from "../models/competency.entity";

export interface ICompetencyRepositoryOutPort {
    findOneById(id: number): Promise<Competency | null>;

    findAll(): Promise<Competency[]>;
}