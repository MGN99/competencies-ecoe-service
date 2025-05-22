import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { LevelCompetencyEntityOrm } from './level-competency.entity.orm';

@Entity('competencies')
export class CompetencyEntityOrm {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @OneToMany(() => LevelCompetencyEntityOrm, level => level.competency)
    levelsCompetence: LevelCompetencyEntityOrm[];
}