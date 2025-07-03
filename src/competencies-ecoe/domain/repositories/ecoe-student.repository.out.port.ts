import { EcoeStudent } from "../models/ecoe-student.entity";
import { Ecoe } from "../models/ecoe.entity";

export interface IEcoeStudentRepositoryOutPort {
    findOneById(id: number): Promise<EcoeStudent | null>;

    findByStudentYear(studentId: string, year: number): Promise<EcoeStudent[] | null>;

    findEcoeIdsAndYearsByStudentId(studentId: string): Promise<{ ecoeId: number, yearSemester: string }[]>;

    save(ecoeStudent: EcoeStudent): Promise<void>;

    findByStudentIdAndEcoeId(studentId: string, ecoeId: number): Promise<EcoeStudent | null>;

    findStudentsByEcoeId(ecoeId: number): Promise<EcoeStudent[]>;

    findByEcoeIds(ecoeIds: number[]): Promise<EcoeStudent[]>;

    findAllByCycle(cycle: 'BASICO' | 'PROFESIONAL' | 'FINAL'): Promise<EcoeStudent[]>;

    delete(id: number): Promise<void>;

    //findByStudentId(studentId: string): Promise<EcoeStudent[]>;
}