import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EcoeStudentEntityOrm } from './ecoe-student.entity.orm';
import { CompetencyEntityOrm } from './competency.entity.orm';


@Entity('student_competencies')
export class StudentCompetencyEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => EcoeStudentEntityOrm, es => es.competencies_evaluated)
    @JoinColumn({ name: 'ecoe_student_id' })
    ecoeStudent: EcoeStudentEntityOrm;

    @ManyToOne(() => CompetencyEntityOrm, c => c.competencies_evaluated)
    @JoinColumn({ name: 'competency_id' })
    competency: CompetencyEntityOrm;

    @Column('numeric')
    grade: number;

    @Column()
    level_achievement: string;
}

