import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EcoeCompetencyEntityOrm } from './ecoe-competency.entity.orm';
import { EcoeStudentEntityOrm } from './ecoe-student.entity.orm';

@Entity('student_competencies')
export class StudentCompetencyEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    student_id: string;

    @ManyToOne(() => EcoeCompetencyEntityOrm)
    @JoinColumn({ name: 'ecoe_competency_id' })
    ecoeCompetency: EcoeCompetencyEntityOrm;

    @ManyToOne(() => EcoeStudentEntityOrm, es => es.competencies_evaluated)
    @JoinColumn({ name: 'ecoe_estudent_id' })
    ecoeStudent: EcoeStudentEntityOrm;

    @Column('numeric')
    grade: number;

    @Column()
    level_achievement: string;
}