import { StudentLevelCompetency } from "src/competencies-ecoe/domain/models/student-level-competency.entity";

export interface IStudentLevelCompetencyRepositoryOutPort {
    findByEcoeStudentId(ecoeStudentId: number): Promise<StudentLevelCompetency[]>;
    //findBySubject(subjectId: number): Promise<any[]>;
}