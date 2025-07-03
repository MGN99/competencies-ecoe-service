import { Competency } from './competency.entity';
import { EcoeStudent } from './ecoe-student.entity';

export class StudentCompetency {
  constructor(
    public grade: number,
    public readonly ecoeStudent: EcoeStudent,
    public competency: Competency,
    public readonly id?: number,
  ) {}
}