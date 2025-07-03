import { Ecoe } from './ecoe.entity';
import { StudentCompetency } from './student-competency.entity';

export class EcoeStudent {
    constructor(
        public studentId: string,
        public ecoe: Ecoe,
        public competenciesEvaluated: StudentCompetency[] = [],
        public readonly id?: number,
    ) { }

    get hasAllCompetencies(): boolean {
        const uniqueCompetencyIds = new Set(
            this.competenciesEvaluated.map(c => c.competency.id)
        );
        return uniqueCompetencyIds.size === 8;
    }

    get finalGrade(): number | null {
        if (!this.hasAllCompetencies) return null;

        const total = this.competenciesEvaluated.reduce((sum, c) => sum + c.grade, 0);
        return total / this.competenciesEvaluated.length;
    }

    get finalAchievementLevel(): string | null {
        const grade = this.finalGrade;
        if (grade == null) return null;

        if (grade >= 5.5 && grade <= 7.0) return 'Satisfactorio';
        if (grade >= 4.0) return 'Suficiente';
        return 'Insuficiente';
    }
}

