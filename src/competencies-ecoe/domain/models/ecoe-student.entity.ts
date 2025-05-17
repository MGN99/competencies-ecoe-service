import { Ecoe } from './ecoe.entity';
import { CompetenceStudent } from './competence-student.entity';

export class EcoeStudent {
  constructor(
    public readonly id: number,
    public studentId: number,
    public ecoe: Ecoe,
    public finalNote: number,
    public finalAchievementLevel: string,
    public competenciesEvaluated: CompetenceStudent[] = []
  ) {}
}
