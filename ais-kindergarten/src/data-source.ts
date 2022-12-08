import "reflect-metadata";
import { DataSource } from "typeorm";
import { Contract } from "./entity/Contract";
import { Contractor } from "./entity/Contractor";
import { ContractType } from "./entity/ContractType";
import { Group } from "./entity/Group";
import { Journal } from "./entity/Journal";
import { User } from "./entity/User";
import { ContractView } from "./view-entity/ContractView";
import { JournalView } from "./view-entity/JournalView";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "kindergarten",
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: [User, Group, Journal, JournalView,
        Contract, Contractor, ContractType, ContractView],
    migrations: [],
    subscribers: [],
});
