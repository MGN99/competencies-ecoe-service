import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EcoeCompetencyEntityOrm } from "./ecoe-competency.entity.orm";
import { EcoeStudentEntityOrm } from "./ecoe-student.entity.orm";


@Entity('ecoes')
export class EcoeEntityOrm {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    semester: string;

    @Column()
    description: string;

    @OneToMany(() => EcoeCompetencyEntityOrm, ecoeCompetency => ecoeCompetency.ecoe)
    competencies: EcoeCompetencyEntityOrm[];

    @OneToMany(() => EcoeStudentEntityOrm, ecoeStudent => ecoeStudent.ecoe)
    students: EcoeStudentEntityOrm[];
}