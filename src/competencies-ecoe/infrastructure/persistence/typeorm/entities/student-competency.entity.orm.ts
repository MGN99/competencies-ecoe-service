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

    // cambiar levelCompetencyId por competencyId
    //@ManyToOne(() => LevelCompetencyEntityOrm)
    //@JoinColumn({ name: 'level_competency_id' })
    //levelCompetency: LevelCompetencyEntityOrm;
    @ManyToOne(() => CompetencyEntityOrm, { eager: true })
    @JoinColumn({ name: 'competency_id' })
    competency: CompetencyEntityOrm;

    @Column('float')
    grade: number;

    @Column({ name: 'level_achievement'})
    levelAchievement: string;
}