import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Journal } from "../entity/Journal";
import { JournalUser } from "../view-entity/JournalUser";
import * as moment from "moment"

export class JournalController
{

    private journalRepository = AppDataSource.getRepository(Journal);
    private journalUserRepository = AppDataSource.getRepository(JournalUser);

    async byDateAndGroup(request: Request, response: Response, next: NextFunction)
    {
        const dateValid = moment(request.params.date, "YYYY-MM-DD").isValid();

        if (!dateValid)
        {
            return null;
        }

        return this.journalUserRepository.findBy({ date: request.params.date, groupId: Number(request.params.groupId) });
    }
}