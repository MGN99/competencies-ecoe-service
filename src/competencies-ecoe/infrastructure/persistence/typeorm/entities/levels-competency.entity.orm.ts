import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CompetencyEntityOrm } from './competency.entity.orm';

@Entity('levels_competencie')
export class LevelsCompetencyEntityOrm {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => CompetencyEntityOrm, competency => competency.levelsCompetence)
    competency: CompetencyEntityOrm;

    @Column()
    level: string

    @Column()
    descriptor: string;
}