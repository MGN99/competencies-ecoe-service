import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { StudentCompetencyEntityOrm } from "./student-competency.entity.orm";
import { EcoeEntityOrm } from "./ecoe.entity.orm";

@Entity('ecoe_student')
export class EcoeStudentEntityOrm {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'student_id' })
    studentId: string;

    @ManyToOne(() => EcoeEntityOrm, ecoe => ecoe.students)
    @JoinColumn({ name: 'ecoe_id' })
    ecoe: EcoeEntityOrm;

    @OneToMany(() => StudentCompetencyEntityOrm, sc => sc.ecoeStudent, {
        cascade: true,
        eager: true,
    })
    @JoinColumn({ name: 'competencies_evaluated' })
    competenciesEvaluated: StudentCompetencyEntityOrm[];
}
