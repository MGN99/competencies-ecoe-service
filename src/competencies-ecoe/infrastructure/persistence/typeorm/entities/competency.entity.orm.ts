import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { LevelsCompetencyEntityOrm } from './levels-competency.entity.orm';
import { EcoeCompetencyEntityOrm } from './ecoe-competency.entity.orm';

@Entity('competencies')
export class CompetencyEntityOrm {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => LevelsCompetencyEntityOrm, level => level.competency)
    levelsCompetence: LevelsCompetencyEntityOrm[];

    @OneToMany(() => EcoeCompetencyEntityOrm, ecoeCompetency => ecoeCompetency.competency)
    ecoes: EcoeCompetencyEntityOrm[];
}