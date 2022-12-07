import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Group } from "../entity/Group";

export class UserController
{
    private userRepository = AppDataSource.getRepository(User);
    private groupRepository = AppDataSource.getRepository(Group);

    async usersByGroupId(request: Request, response: Response, next: NextFunction)
    {
        const group = await this.groupRepository.findOneBy({ id: Number(request.params.id) });
        return this.userRepository.findBy({ group });
    }

    /*
    async all(request: Request, response: Response, next: NextFunction)
    {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction)
    {
        return this.userRepository.findOneBy({ id: Number(request.params.id) });
    }

    async save(request: Request, response: Response, next: NextFunction)
    {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction)
    {
        let userToRemove = await this.userRepository.findOneBy({ id: Number(request.params.id) });
        await this.userRepository.remove(userToRemove);
    }
    */

}