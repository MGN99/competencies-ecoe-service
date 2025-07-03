import { StudentCompetency } from "src/competencies-ecoe/domain/models/student-competency.entity";

export interface IStudentCompetencyRepositoryOutPort {
    findByEcoeStudentId(ecoeStudentId: number): Promise<StudentCompetency[]>;

    findOneByEcoeStudentAndCompetency(ecoeStudentId: number, competencyId: number): Promise<StudentCompetency | undefined>;

    save(studentCompetency: StudentCompetency): Promise<void>;
    //findBySubject(subjectId: number): Promise<any[]>;
}