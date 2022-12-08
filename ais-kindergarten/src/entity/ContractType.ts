import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Contract } from "./Contract";

@Entity()
export class ContractType
{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Contract, (contract) => contract.contractType)
    contracts: Contract[];

}
