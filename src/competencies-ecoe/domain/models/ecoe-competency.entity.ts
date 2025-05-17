import { Ecoe } from './ecoe.entity';
import { Competency } from './competency.entity';

export class EcoeCompetency {
  constructor(
    public readonly id: number,
    public ecoe: Ecoe,
    public competency: Competency
  ) {}
}
