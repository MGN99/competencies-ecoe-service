export class EcoeStudentResponseDto {
    id: number;
    studentId: string;
    ecoeId: number;
    competenciesEvaluatedIds: number[];
    finalGrade: number;
    finalAchievementLevel: string;
}