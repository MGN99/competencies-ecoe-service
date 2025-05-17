import { Ecoe } from './ecoe.entity';
import { Competence } from './competence.entity';

export class EcoeCompetence {
  constructor(
    public readonly id: number,
    public ecoe: Ecoe,
    public competence: Competence
  ) {}
}
