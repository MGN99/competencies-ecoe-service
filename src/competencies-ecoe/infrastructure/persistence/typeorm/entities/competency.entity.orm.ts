import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { LevelsCompetencyEntityOrm } from './levels-competency.entity.orm';
import { StudentCompetencyEntityOrm } from './student-competency.entity.orm';

@Entity('competencies')
export class CompetencyEntityOrm {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @OneToMany(() => LevelsCompetencyEntityOrm, level => level.competency)
    levelsCompetence: LevelsCompetencyEntityOrm[];

    //@OneToMany(() => StudentCompetencyEntityOrm, sc => sc.competency)
    //competencies_evaluated: StudentCompetencyEntityOrm[];
}