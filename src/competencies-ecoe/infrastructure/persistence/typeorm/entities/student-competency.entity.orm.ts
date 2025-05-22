import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EcoeStudentEntityOrm } from './ecoe-student.entity.orm';
import { CompetencyEntityOrm } from './competency.entity.orm';


@Entity('student_competencies')
export class StudentCompetencyEntityOrm {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => EcoeStudentEntityOrm, ecoeStudent => ecoeStudent.competenciesEvaluated)
    @JoinColumn({ name: 'ecoe_student_id' })
    ecoeStudent: EcoeStudentEntityOrm;

    @ManyToOne(() => CompetencyEntityOrm)
    @JoinColumn({ name: 'competency_id' })
    competency: CompetencyEntityOrm;

    @Column('float')
    grade: number;

    @Column()
    level_achievement: string;
}