import { Ecoe } from './ecoe.entity';
import { StudentLevelCompetency } from './student-level-competency.entity';

export class EcoeStudent {
    constructor(
        public readonly id: number,
        public studentId: string,
        public ecoe: Ecoe,
        public levelCompetenciesEvaluated: StudentLevelCompetency[] = []
    ) { }

    get hasAllCompetencies(): boolean {
        const uniqueCompetencyIds = new Set(
            this.levelCompetenciesEvaluated.map(c => c.levelCompetency.competency.id)
        );
        return uniqueCompetencyIds.size === 8;
    }

    get finalGrade(): number | null {
        if (!this.hasAllCompetencies) return null;

        const total = this.levelCompetenciesEvaluated.reduce((sum, c) => sum + c.grade, 0);
        return total / this.levelCompetenciesEvaluated.length;
    }

    get finalAchievementLevel(): string | null {
        const grade = this.finalGrade;
        if (grade == null) return null;

        if (grade >= 5.5 && grade <= 7.0) return 'Satisfactorio';
        if (grade >= 4.0) return 'Suficiente';
        return 'Insuficiente';
    }
}

