import { Role } from "./role.model";
import { UserStatus } from "./user-status.model";
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
        public roles: Role[],
        public permissions: string[],
        public userStatusID: number, 
        public userStatus: UserStatus,
        public points?: number,
        public imagePath?: string
    ) {}
}