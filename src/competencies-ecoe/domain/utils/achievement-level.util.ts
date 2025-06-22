export function getAchievementLevel(grade: number): string {
    if (grade >= 5.5 && grade <= 7.0) return 'Satisfactorio';
    if (grade >= 4.0) return 'Suficiente';
    return 'Insuficiente';
}