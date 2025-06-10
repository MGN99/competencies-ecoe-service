import { EcoeInstance } from './ecoe_instance.entity';
import { StudentLevelCompetency } from './student-level-competency.entity';

export class EcoeStudent {
  constructor(
    public readonly id: number,
    public studentId: string,
    public ecoeInstance: EcoeInstance,
    public finalNote: number,
    public finalAchievementLevel: string,
    public levelCompetenciesEvaluated: StudentLevelCompetency[] = []
  ) {}
}
