import { StudentCompetency } from "src/competencies-ecoe/domain/models/student-competency.entity";

export interface IStudentCompetencyRepositoryOutPort {
    findByEcoeStudentId(ecoeStudentId: number): Promise<StudentCompetency[]>;
    findBySubject(subjectId: number): Promise<any[]>;
}