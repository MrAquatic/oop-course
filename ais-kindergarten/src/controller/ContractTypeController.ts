import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { ContractType } from "../entity/ContractType";

export class ContractTypeController
{

    private contractTypeRepository = AppDataSource.getRepository(ContractType);

    async all(request: Request, response: Response, next: NextFunction)
    {
        return this.contractTypeRepository.find();
    }

}