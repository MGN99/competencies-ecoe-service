export class EcoeStudentResponseDto {
    id: number;
    studentId: string;
    ecoeId: number;
    //competenciesEvaluatedIds: number[];
    competenciesEvaluated: {
        id: number;
        competencyId: number;
        competencyName: string;
        grade: number;
        achievementLevel: string;
    }[];
    finalGrade: number;
    finalAchievementLevel: string;
}