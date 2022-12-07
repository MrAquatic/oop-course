import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Group } from "../entity/Group";
import { User } from "../entity/User";

export class GroupController
{

    private groupRepository = AppDataSource.getRepository(Group);

    async all(request: Request, response: Response, next: NextFunction)
    {
        return this.groupRepository.find();
    }

}