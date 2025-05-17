
import { Competency } from './competency.entity';

export class LevelCompetency {
  constructor(
    public readonly id: number,
    public competency: Competency,
    public level: 'inicial' | 'intermedio' | 'avanzado',
    public descriptor: string
  ) {}
}
