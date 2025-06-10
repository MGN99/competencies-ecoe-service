 import { Ecoe } from "./ecoe.entity";
import { LevelCompetency } from "./level-competency.entity";
// Si tienes una clase Ecoe y EcoeStudent, impórtalas también

export class EcoeInstance {
  constructor(
    public readonly id: number,
    //public readonly name: string,
    public readonly description: string,
    public readonly year: number,
    public readonly levelCompetencies: LevelCompetency[] = [],
    public readonly ecoe: Ecoe,
    // public readonly students?: EcoeStudent[],
  ) {}
}
 
 /*
  addLevelCompetency(competencyId: number): void {
    if (!this.levelCompetencies.includes(competencyId)) {
      this.levelCompetencies.push(competencyId);
    }
  }

  removeLevelCompetency(competencyId: number): number[] {
    return this.levelCompetencies.filter(id => id !== competencyId);
  }
    */


/**
 * 
 * 
// domain/models/ecoe_instance.model.ts
import { Ecoe } from './ecoe.model';

export interface EcoeInstance {
  id: string;
  ecoe: Ecoe;
  year: number;
  semester: string;
  description: string;
  createdAt: Date;
}
 
*/