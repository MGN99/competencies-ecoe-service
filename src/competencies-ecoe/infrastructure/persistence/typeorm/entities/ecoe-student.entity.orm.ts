import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EcoeEntityOrm } from "./ecoe.entity.orm";
import { StudentCompetencyEntity } from "./student-competency.entity.orm";


@Entity('ecoe_student')
export class EcoeStudentEntityOrm {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    student_id: number;

    @ManyToOne(() => EcoeEntityOrm, ecoe => ecoe.students)
    @JoinColumn({ name: 'ecoe_id' })
    ecoe: EcoeEntityOrm;

    @Column('numeric')
    final_note: number;

    @Column()
    final_achievement_level: string;

    @OneToMany(() => StudentCompetencyEntity, sc => sc.ecoeStudent)
    competencies_evaluated: StudentCompetencyEntity[];
}
