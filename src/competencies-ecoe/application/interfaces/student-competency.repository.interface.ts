import { StudentCompetency } from "src/competencies-ecoe/domain/models/student-competency.entity";

export interface StudentCompetencyRepository {
  findByStudentAndEcoeYear(studentId: string, EcoeYear: number): Promise<StudentCompetency[]>;
  findBySubject(subjectId: number): Promise<any[]>;
}