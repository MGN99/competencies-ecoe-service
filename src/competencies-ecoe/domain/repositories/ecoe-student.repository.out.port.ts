import { EcoeStudent } from "../models/ecoe-student.entity";
import { Ecoe } from "../models/ecoe.entity";


export interface IEcoeStudentRepositoryOutPort {
    findOneByStudentAndYear(studentId: string, ecoeYear: number): Promise<EcoeStudent | null>;

    findEcoeYearsByStudentId(studentId: string): Promise<number[]>;

    addEcoeInstanceStudent(ecoeId: number, studentId: string): Promise<void>;

    existsStudentInEcoeYear(studentId: string, ecoeYear: number): Promise<boolean>;

    findStudentsByEcoeId(ecoeId: number): Promise<EcoeStudent[]>;
}