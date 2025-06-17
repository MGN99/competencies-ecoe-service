import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Index } from "typeorm";
import { EcoeStudentEntityOrm } from "./ecoe-student.entity.orm";

@Index(['year', 'semester'], { unique: true })
@Entity('ecoes')
export class EcoeEntityOrm {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column({ type: 'varchar' })
    cycle: 'BASICO' | 'PROFESIONAL' | 'FINAL';

    @Column()
    semester: number;

    @Column({ type: 'int' })
    year: number;

    @Column({ type: 'text' })
    description: string;

    @OneToMany(() => EcoeStudentEntityOrm, ecoeStudent => ecoeStudent.ecoe)
    students: EcoeStudentEntityOrm[];
}