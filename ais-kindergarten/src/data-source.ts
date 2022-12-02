import "reflect-metadata"
import { DataSource } from "typeorm"
import { Group } from "./entity/Group";
import { Journal } from "./entity/Journal";
import { User } from "./entity/User"

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
    entities: [User, Group, Journal],
    migrations: [],
    subscribers: [],
})
