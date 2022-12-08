import { ViewEntity, ViewColumn, DataSource, Column } from "typeorm";
import { Contract } from "../entity/Contract";
import { Contractor } from "../entity/Contractor";

@ViewEntity({
    expression: (dataSource: DataSource) =>
    {
        return dataSource
            .createQueryBuilder()
            .select("contract.id", "contractId")
            .addSelect("contract.contractTypeId", "contractTypeId")
            .addSelect("contract.date", "date")
            .addSelect("contract.price", "price")
            .addSelect("contract.count", "count")
            .addSelect("contractor.name", "contractor")
            .addSelect("contract.total", "total")
            .from(Contract, "contract")
            .leftJoin(Contractor, "contractor", "contractor.id = contract.contractorId");
    }
})
export class ContractView
{

    @ViewColumn()
    contractId: number;

    @ViewColumn()
    contractTypeId: number;

    @Column({ type: "date" })
    date: string;

    @ViewColumn()
    price: number;

    @ViewColumn()
    count: number;

    @ViewColumn()
    contractor: string;

    @ViewColumn()
    total: number;

}