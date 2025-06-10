import { EcoeStudent } from './ecoe-student.entity';
import { LevelCompetency } from './level-competency.entity';

export class StudentLevelCompetency {
  constructor(
    public readonly id: number,
    public grade: number,
    public levelAchievement: string,
    public readonly ecoeStudent: EcoeStudent,
    public levelCompetency: LevelCompetency,
  ) {}
}