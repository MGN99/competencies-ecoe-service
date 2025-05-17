
import { Competence } from './competence.entity';

export class LevelCompetence {
  constructor(
    public readonly id: number,
    public competence: Competence,
    public level: 'inicial' | 'intermedio' | 'avanzado',
    public descriptor: string
  ) {}
}
