import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Contractor } from "./Contractor";
import { ContractType } from "./ContractType";

@Entity()
export class Contract
{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ContractType)
    @JoinColumn({ name: "contractTypeId" })
    contractType: ContractType;

    @Column({type: "date"})
    date: string;

    @Column()
    price: number;

    @Column()
    count: number;

    @ManyToOne(() => Contractor)
    @JoinColumn({ name: "contractorId" })
    contractor: Contractor;

    @Column()
    total: number;
}
