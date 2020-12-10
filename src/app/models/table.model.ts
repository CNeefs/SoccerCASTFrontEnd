import { User } from './user.model';
export class Table {
    constructor(public tableID: number, public tableName: string, public companyName: string, public location: string, public contactUserID: number, public contactUser: User) {}
}