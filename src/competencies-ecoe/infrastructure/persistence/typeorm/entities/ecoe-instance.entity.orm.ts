import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Index, ManyToOne } from "typeorm";
import { EcoeEntityOrm } from "./ecoe.entity.orm";
import { LevelCompetencyEntityOrm } from './level-competency.entity.orm';
import { EcoeStudentEntityOrm } from "./ecoe-student.entity.orm";

@Index(['ecoe', 'year'], { unique: true })
@Entity('ecoe_instancies')
export class EcoeInstanceEntityOrm {
    @PrimaryGeneratedColumn()
    id: number;
  
    //@Column()
    //name: string;
  
    @Column({ type: 'text' })
    description: string;

    @Column()
    semester: number;

    @Column({ type: 'int' })
    year: number;

    @ManyToOne(() => EcoeEntityOrm)
    @JoinColumn({ name: 'ecoe_id' })
    ecoe: EcoeEntityOrm

    @ManyToMany(() => LevelCompetencyEntityOrm)
    @JoinTable({
        name: 'ecoe_level_competency',
        joinColumn: { name: 'ecoe_instance_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'level_competency_id', referencedColumnName: 'id' }
    })
    levelCompetencies: LevelCompetencyEntityOrm[];

    @OneToMany(() => EcoeStudentEntityOrm, ecoeStudent => ecoeStudent.ecoeInstance)
    students: EcoeStudentEntityOrm[];
}