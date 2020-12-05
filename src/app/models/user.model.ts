import { Role } from "./role.model";

export class User {
    constructor(
        public userID: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public token: string,
        public birthDate: Date,
        public timesWon: number,
        public timesLost: number,
        public roleID: number,
        public role: Role
    ) {}
}