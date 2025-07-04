import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    JoinColumn,
} from "typeorm";
import { StudentCompetencyEntityOrm } from "./student-competency.entity.orm";
import { EcoeEntityOrm } from "./ecoe.entity.orm";

@Entity('ecoe_student')
export class EcoeStudentEntityOrm {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'student_id' })
    studentId: string;

    @ManyToOne(() => EcoeEntityOrm, ecoe => ecoe.students, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ecoe_id' })
    ecoe: EcoeEntityOrm;

    @OneToMany(() => StudentCompetencyEntityOrm, sc => sc.ecoeStudent, {
        cascade: true,
        eager: true,
    })
    competenciesEvaluated: StudentCompetencyEntityOrm[];
}
