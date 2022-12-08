import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Contract } from "../entity/Contract";
import { ContractView } from "../view-entity/ContractView";
import * as moment from "moment";
import { Contractor } from "../entity/Contractor";
import { ContractType } from "../entity/ContractType";

type NewContractData = {
    contractTypeId: number,
    contractorId: number,
    date: string,
    price: number,
    count: number;
};

export class ContractController
{

    private contractRepository = AppDataSource.getRepository(Contract);

    private contractorRepository = AppDataSource.getRepository(Contractor);

    private contractViewRepository = AppDataSource.getRepository(ContractView);

    private contractTypeRepository = AppDataSource.getRepository(ContractType);

    async byType(request: Request, response: Response, next: NextFunction)
    {
        return this.contractViewRepository.findBy({ contractTypeId: Number(request.params.contractTypeId) });
    }

    async save(request: Request, response: Response, next: NextFunction)
    {
        let inputData: NewContractData = request.body;

        console.log(request.body);

        const dateValid = moment(inputData.date, "YYYY-MM-DD").isValid();

        if (!dateValid || inputData.count <= 0 || inputData.price < 0)
        {
            response.status(400);
            return "wrong data";
        }

        const contractor = await this.contractorRepository.findOneBy({ id: inputData.contractorId });
        const contractType = await this.contractTypeRepository.findOneBy({ id: inputData.contractTypeId });

        if (contractor === null || contractType === null)
        {
            response.status(400);
            return "wrong data";
        }

        let contract = new Contract();
        contract.contractType = contractType;
        contract.contractor = contractor;
        contract.count = inputData.count;
        contract.date = inputData.date;
        contract.price = inputData.price;
        contract.total = inputData.count * inputData.price;

        return await this.contractRepository.save(contract);
    }
}