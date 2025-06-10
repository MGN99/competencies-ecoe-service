import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EcoeStudentEntityOrm } from './ecoe-student.entity.orm';
import { LevelCompetencyEntityOrm } from './level-competency.entity.orm';


@Entity('student_competencies')
export class StudentCompetencyEntityOrm {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => EcoeStudentEntityOrm, ecoeStudent => ecoeStudent.competenciesEvaluated)
    @JoinColumn({ name: 'ecoe_student_id' })
    ecoeStudent: EcoeStudentEntityOrm;

    @ManyToOne(() => LevelCompetencyEntityOrm)
    @JoinColumn({ name: 'level_competency_id' })
    levelCompetency: LevelCompetencyEntityOrm;

    @Column('float')
    grade: number;

    @Column({ name: 'level_achievement'})
    levelAchievement: string;
}