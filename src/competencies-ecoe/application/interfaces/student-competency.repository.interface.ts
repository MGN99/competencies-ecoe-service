export interface StudentCompetencyRepository {
  findByStudentAndEcoeYear(studentId: string, year: string): Promise<any[]>;
  findBySubject(subjectId: number): Promise<any[]>;
}