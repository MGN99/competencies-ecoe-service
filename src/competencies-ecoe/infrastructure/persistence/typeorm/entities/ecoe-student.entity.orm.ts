import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { EcoeEntityOrm } from "./ecoe.entity.orm";
import { StudentCompetencyEntityOrm } from "./student-competency.entity.orm";

@Entity('ecoe_student')
@Unique(['student_id', 'ecoe_year'])
export class EcoeStudentEntityOrm {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  student_id: string;

  @Column('numeric')
  final_note: number;

  @Column()
  final_achievement_level: string;

  @Column('numeric')
  ecoe_year: number;

  @ManyToOne(() => EcoeEntityOrm, ecoe => ecoe.students)
  @JoinColumn({ name: 'ecoe_id' })
  ecoe: EcoeEntityOrm;

  @OneToMany(() => StudentCompetencyEntityOrm, sc => sc.ecoeStudent, {
    cascade: true,
    eager: true,
  })
  competenciesEvaluated: StudentCompetencyEntityOrm[];
}
