import { EcoeStudent } from "../models/ecoe-student.entity";


export interface IEcoeStudentRepositoryOutPort {
    findByStudentIdAndEcoeYear(studentId: string, ecoeYear: number): Promise<EcoeStudent | null>;
}