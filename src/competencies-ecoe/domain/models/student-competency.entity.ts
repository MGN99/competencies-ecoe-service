import { Competency } from './competency.entity';
import { EcoeStudent } from './ecoe-student.entity';

export class StudentCompetency {
  constructor(
    public readonly id: number,
    public grade: number,
    public levelAchievement: string,
    public readonly ecoeStudent: EcoeStudent,
    public competency: Competency,
  ) {}
}