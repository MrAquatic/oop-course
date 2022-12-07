import { ViewEntity, ViewColumn, DataSource, Column } from "typeorm";
import { Journal } from "../entity/Journal";
import { User } from "../entity/User";

@ViewEntity({
    expression: (dataSource: DataSource) =>
    {
        return dataSource
            .createQueryBuilder()
            .select("journal.id", "journalId")
            .addSelect("user.groupId", "groupId")
            .addSelect("journal.date", "date")
            .addSelect("user.firstName", "firstName")
            .addSelect("user.lastName", "lastName")
            .addSelect("journal.was", "was")
            .from(Journal, "journal")
            .leftJoin(User, "user", "user.id = journal.userId");
    }
})
export class JournalUser
{

    @ViewColumn()
    journalId: number;

    @ViewColumn()
    groupId: number;

    @Column({ type: "date" })
    date: string;

    @ViewColumn()
    firstName: string;

    @ViewColumn()
    lastName: string;

    @ViewColumn()
    was: boolean;

}