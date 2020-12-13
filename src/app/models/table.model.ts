import { User } from './user.model';
import { TableStatus } from './table-status.model';
export class Table {
    constructor(public tableID: number, public tableName: string, public companyName: string, public location: string, public contactUserID: number, public contactUser: User,
        public tableStatusID: number, public tableStatus: TableStatus) {}
}