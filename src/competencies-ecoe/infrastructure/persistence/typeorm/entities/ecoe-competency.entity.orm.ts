import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EcoeEntityOrm } from "./ecoe.entity.orm";
import { CompetencyEntityOrm } from "./competency.entity.orm";

@Entity('ecoe_competency')
export class EcoeCompetencyEntityOrm {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => EcoeEntityOrm, ecoe => ecoe.competencies)
    @JoinColumn({ name: 'ecoe_id' })
    ecoe: EcoeEntityOrm;

    @ManyToOne(() => CompetencyEntityOrm, competency => competency.ecoes)
    @JoinColumn({ name: 'competency_id' })
    competency: CompetencyEntityOrm;
}