import { Competency } from './competency.entity';
//import { EcoeStudent } from './ecoe-student.entity';

export class StudentCompetency {
  constructor(
    public readonly id: number,
    public competency: Competency,
    public grade: number,
    public achievementLevel: string
  ) {}
}