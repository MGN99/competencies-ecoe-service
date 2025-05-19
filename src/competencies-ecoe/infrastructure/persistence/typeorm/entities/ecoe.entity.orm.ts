import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EcoeStudentEntityOrm } from "./ecoe-student.entity.orm";


@Entity('ecoes')
export class EcoeEntityOrm {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    semester: number;

    @Column()
    description: string;

    @OneToMany(() => EcoeStudentEntityOrm, ecoeStudent => ecoeStudent.ecoe)
    students: EcoeStudentEntityOrm[];
}
