import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Group } from "./Group";
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Group, (group) => group.users)
    group: Group

    @Column()
    firstName: string

    @Column()
    lastName: string

}
