import { User } from './user.model';
import { TeamStatus } from './team-status.model';

export class Team {
    constructor(
        public teamID: number,
        public teamName: string,
        public companyName: string,
        public location: string,
        public captainID: number,
        public captain: User,
        public teamStatusID: number,
        public teamStatus: TeamStatus
    ) {}
}