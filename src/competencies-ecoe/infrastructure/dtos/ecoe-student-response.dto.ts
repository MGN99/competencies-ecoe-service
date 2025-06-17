export class EcoeStudentResponseDto {
    id: number;
    studentId: string;
    ecoeId: number;
    levelCompetenciesEvaluatedIds: number[];
    finalGrade: number;
    finalAchievementLevel: string;
}