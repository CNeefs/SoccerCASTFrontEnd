import { User } from './user.model';

export class Team {
    constructor(
        public teamID: number,
        public teamName: string,
        public companyName: string,
        public location: string,
        public captainID: number,
        public captain: User
    ) {}
}