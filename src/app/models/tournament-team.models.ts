import { Team } from './team.model';
import { User } from './user.model';
export class TournamentTeam {
    constructor(public tournamentTeamID: number, public tournamentID: number, public teamID: number, public team: Team, public player1ID: number, public player1: User,
        public player2ID: number, public player2: User) {}
}