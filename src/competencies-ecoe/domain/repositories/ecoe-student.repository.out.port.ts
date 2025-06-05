import { EcoeStudent } from "../models/ecoe-student.entity";
import { Ecoe } from "../models/ecoe.entity";


export interface IEcoeStudentRepositoryOutPort {
    findByStudentIdAndEcoeYear(studentId: string, ecoeYear: number): Promise<EcoeStudent | null>;

    findEcoeYearsByStudentId(studentId: string): Promise<number[]>;

    addStudent(studentId: string, ecoeId: number, year: number): Promise<void>;

    existsStudentInEcoeYear(studentId: string, ecoeYear: number): Promise<boolean>;

    findStudentsByEcoeId(ecoeId: number): Promise<EcoeStudent[]>;
}