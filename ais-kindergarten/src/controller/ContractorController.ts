import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Contractor } from "../entity/Contractor";

export class ContractorController
{

    private contractorRepository = AppDataSource.getRepository(Contractor);

    async all(request: Request, response: Response, next: NextFunction)
    {
        return this.contractorRepository.find();
    }

}