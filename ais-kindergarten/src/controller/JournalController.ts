import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Journal } from "../entity/Journal";
import { JournalView } from "../view-entity/JournalView";
import * as moment from "moment"

export class JournalController
{

    private journalRepository = AppDataSource.getRepository(Journal);
    private journalViewRepository = AppDataSource.getRepository(JournalView);

    async byDateAndGroup(request: Request, response: Response, next: NextFunction)
    {
        const dateValid = moment(request.params.date, "YYYY-MM-DD").isValid();

        if (!dateValid)
        {
            return null;
        }

        return this.journalViewRepository.findBy({ date: request.params.date, groupId: Number(request.params.groupId) });
    }

    async toggleMark(request: Request, response: Response, next: NextFunction)
    {
        let journalEntryToUpdate = await this.journalRepository.findOneBy({ id: Number(request.params.id) });
        journalEntryToUpdate.was = !journalEntryToUpdate.was;
        return await this.journalRepository.save(journalEntryToUpdate);
    }
}