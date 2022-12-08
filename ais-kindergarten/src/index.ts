import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { User } from "./entity/User";
import { Group } from "./entity/Group";
import { Journal } from "./entity/Journal";
import { ContractType } from "./entity/ContractType";
import { Contract } from "./entity/Contract";
import { Contractor } from "./entity/Contractor";

AppDataSource.initialize().then(async () =>
{

    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    // register express routes from defined application routes
    Routes.forEach(route =>
    {
        app[route.method](route.route, (req: Request, res: Response, next: Function) =>
        {
            const result = (new route.controller)[route.action](req, res, next);
            if (result instanceof Promise)
            {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            }
            else if (result !== null && result !== undefined)
            {
                res.json(result);
            }
        });
    });

    // start express server
    app.listen(4000);

    // Создадим группы
    const group1 = AppDataSource.manager.create(Group, {
        name: "Младшая"
    });

    const group2 = AppDataSource.manager.create(Group, {
        name: "Подготовительная"
    });

    await AppDataSource.manager.save(group1);
    await AppDataSource.manager.save(group2);

    // Добавим людей

    const user1 = AppDataSource.manager.create(User, {
        firstName: "Ваня",
        lastName: "Иванов",
        group: group1
    });

    const user2 = AppDataSource.manager.create(User, {
        firstName: "Коля",
        lastName: "Колянов",
        group: group2
    });

    const user3 = AppDataSource.manager.create(User, {
        firstName: "Миша",
        lastName: "Мишанов",
        group: group2
    });

    await AppDataSource.manager.save(user1);
    await AppDataSource.manager.save(user2);
    await AppDataSource.manager.save(user3);

    // Добавим запись в журнал
    await AppDataSource.manager.save(
        AppDataSource.manager.create(Journal, {
            user: user1,
            date: "2022-12-05",
            was: true
        })
    );

    await AppDataSource.manager.save(
        AppDataSource.manager.create(Journal, {
            user: user2,
            date: "2022-12-06",
            was: false
        })
    );

    await AppDataSource.manager.save(
        AppDataSource.manager.create(Journal, {
            user: user3,
            date: "2022-12-06",
            was: false
        })
    );

    // Проделаем тоже самое, но для контрактов.

    // Создадим типы контрактов.
    const type1 = AppDataSource.manager.create(ContractType, {
        name: "Помидоры"
    });

    const type2 = AppDataSource.manager.create(ContractType, {
        name: "Яблоки"
    });

    const type3 = AppDataSource.manager.create(ContractType, {
        name: "Картопля"
    });

    const type4 = AppDataSource.manager.create(ContractType, {
        name: "'Царь-бомба' (АН-602)"
    });

    await AppDataSource.manager.save(type1);
    await AppDataSource.manager.save(type2);
    await AppDataSource.manager.save(type3);
    await AppDataSource.manager.save(type4);

    // Создадим поставщиков.
    const contractor1 = AppDataSource.manager.create(Contractor, {
        name: "ООО 'Рога и копыта'"
    });

    const contractor2 = AppDataSource.manager.create(Contractor, {
        name: "ООО 'Вкусно - и точка'"
    });

    await AppDataSource.manager.save(contractor1);
    await AppDataSource.manager.save(contractor2);

    // Добавим контракты.
    const contract1 = AppDataSource.manager.create(Contract, {
        contractType: type1,
        contractor: contractor1,
        date: "2022-12-08",
        count: 5,
        price: 150,
        total: 5 * 150
    });

    const contract2 = AppDataSource.manager.create(Contract, {
        contractType: type4,
        contractor: contractor2,
        date: "2022-12-09",
        count: 1,
        price: 10000,
        total: 1 * 10000
    });

    await AppDataSource.manager.save(contract1);
    await AppDataSource.manager.save(contract2);

    console.log("Express server has started on port 4000.");

}).catch(error => console.log(error));
