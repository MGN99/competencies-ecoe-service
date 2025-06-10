import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { StudentCompetencyEntityOrm } from "./student-competency.entity.orm";
import { EcoeInstanceEntityOrm } from "./ecoe-instance.entity.orm";

@Entity('ecoe_student')
@Unique(['student_id', 'ecoe_year'])
export class EcoeStudentEntityOrm {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'ecoe_instance_id' })
  studentId: string;

  @Column('numeric', { name: 'final_note' })
  finalNote: number;

  @Column({ name: 'final_archievement_level' })
  finalArchievementLevel: string;

  @ManyToOne(() => EcoeInstanceEntityOrm, ecoeInstance => ecoeInstance.students)
  @JoinColumn({ name: 'ecoe_instance_id' })
  ecoeInstance: EcoeInstanceEntityOrm;

  @OneToMany(() => StudentCompetencyEntityOrm, sc => sc.ecoeStudent, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'competencies_evaluated' })
  competenciesEvaluated: StudentCompetencyEntityOrm[];
}
