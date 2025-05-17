import { EcoeCompetency } from './ecoe-competency.entity';
import { EcoeStudent } from './ecoe-student.entity';

export class CompetencyStudent {
  constructor(
    public readonly id: number,
    public studentId: number,
    public ecoeCompetency: EcoeCompetency,
    public ecoeStudent: EcoeStudent,
    public grade: number,
    public achievementLevel: string
  ) {}
}
