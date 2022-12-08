import { ContractController } from "./controller/ContractController";
import { ContractorController } from "./controller/ContractorController";
import { ContractTypeController } from "./controller/ContractTypeController";
import { GroupController } from "./controller/GroupController";
import { JournalController } from "./controller/JournalController";

export const Routes = [{
    method: "get",
    route: "/groups",
    controller: GroupController,
    action: "all"
}, {
    method: "get",
    route: "/journal/:date/:groupId",
    controller: JournalController,
    action: "byDateAndGroup"
}, {
    method: "post",
    route: "/journal/:id",
    controller: JournalController,
    action: "toggleMark"
}, {
    method: "get",
    route: "/contract-types",
    controller: ContractTypeController,
    action: "all"
}, {
    method: "get",
    route: "/contracts/:contractTypeId",
    controller: ContractController,
    action: "byType"
}, {
    method: "get",
    route: "/contractors",
    controller: ContractorController,
    action: "all"
}, {
    method: "post",
    route: "/contracts",
    controller: ContractController,
    action: "save"
}
];