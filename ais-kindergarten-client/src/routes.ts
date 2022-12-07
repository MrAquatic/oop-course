import { GroupController } from "./controller/GroupController";
import { JournalController } from "./controller/JournalController";
import { UserController } from "./controller/UserController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "get",
    route: "/groups",
    controller: GroupController,
    action: "all"
}, {
    method: "get",
    route: "/users-by-group/:id",
    controller: UserController,
    action: "usersByGroupId"
},
{
    method: "get",
    route: "/journal/:date/:groupId",
    controller: JournalController,
    action: "byDateAndGroup"
}
];