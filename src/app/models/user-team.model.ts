import { User } from '../models/user.model';
import { Team } from '../models/team.model';

export class UserTeam {
    constructor(
        public userTeamID: number,
        public userID?: number,
        public user?: User,
        public teamID?: number,
        public team?: Team
    ) {}
}