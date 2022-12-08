import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Contract } from "./Contract";

@Entity()
export class Contractor
{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Contract, (contract) => contract.contractor)
    contracts: Contract[];

}
