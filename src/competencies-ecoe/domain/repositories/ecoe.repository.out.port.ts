import { Ecoe } from "../models/ecoe.entity";

export interface IEcoeRepositoryOutPort {
    save(ecoe: Ecoe): Promise<Ecoe>;

    findAll(): Promise<Ecoe[]>;

    findOneById(id: number): Promise<Ecoe | null>;

    findOneByCycleSemesterYear(cycle: 'BASICO' | 'PROFESIONAL' | 'FINAL', semester: number, year: number): Promise<Ecoe | null>;

    findByCycle(cycle: 'BASICO' | 'PROFESIONAL' | 'FINAL'): Promise<Ecoe[]>;

    findByCycleYear(cycle: 'BASICO' | 'PROFESIONAL' | 'FINAL', year: number): Promise<Ecoe[]>;

    findAllByCycle(cycle: 'BASICO' | 'PROFESIONAL' | 'FINAL'): Promise<Ecoe[]>;
}