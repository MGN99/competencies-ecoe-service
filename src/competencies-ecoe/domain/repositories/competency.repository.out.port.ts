import { Competency } from "../models/competency.entity";
import { EcoeStudent } from "../models/ecoe-student.entity";

export interface ICompetencyRepositoryOutPort {
    findById(id: number): Promise<Competency | null>;
}