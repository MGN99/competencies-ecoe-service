import { Ecoe } from './ecoe.entity';
import { CompetencyStudent } from './competency-student.entity';

export class EcoeStudent {
  constructor(
    public readonly id: number,
    public studentId: string,
    public ecoe: Ecoe,
    public finalNote: number,
    public finalAchievementLevel: string,
    public competenciesEvaluated: CompetencyStudent[] = []
  ) {}
}
