import { EcoeCompetence } from './ecoe-competence.entity';
import { EcoeStudent } from './ecoe-student.entity';

export class CompetenceStudent {
  constructor(
    public readonly id: number,
    public studentId: number,
    public ecoeCompetence: EcoeCompetence,
    public ecoeStudent: EcoeStudent,
    public grade: number,
    public achievementLevel: string
  ) {}
}
