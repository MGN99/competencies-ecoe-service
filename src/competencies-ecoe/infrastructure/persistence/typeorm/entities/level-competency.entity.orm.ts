import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CompetencyEntityOrm } from './competency.entity.orm';

@Entity('level_competency')
export class LevelCompetencyEntityOrm {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => CompetencyEntityOrm, competency => competency.levelsCompetence)
    @JoinColumn({ name: 'competency_id' })
    competency: CompetencyEntityOrm;

    @Column()
    level: string

    @Column()
    descriptor: string;
}