import { User } from './user.model';
import { Team } from './team.model';
import { MatchType } from './match-type.model';
import { MatchStatus } from './match-status.model';
import { Competition } from './competition.model';
import { Tournament } from './tournament.model';
import { Table } from './table.model';
export class Match {
    constructor(public matchID: number, public score1: number, public score2: number, public date: Date, public tableID: number, public table: Table,
        public matchTypeID: number, public matchType: MatchType, public team1ID: number, public team1: Team, public team2ID: number, public team2: Team,
        public player1ID: number, public player1: User, public player2ID: number, public player2: User, public player3ID: number, public player3: User,
        public player4ID: number, public player4: User, public matchStatusID: number, public matchStatus: MatchStatus, public competitionID: number,
        public competition: Competition, public tournamentID: number, public tournament: Tournament, public round?: number, public number?: number, public nextRound?: number) {}
}