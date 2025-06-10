import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('ecoes')
export class EcoeEntityOrm {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
}
