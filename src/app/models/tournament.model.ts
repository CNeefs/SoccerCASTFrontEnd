import { TournamentStatus } from './tournament-status.model';
export class Tournament {
    constructor(public tournamentID: number, public edition: string, public total_Joined: number, public match_Count: number, public isStart: boolean, public winner: string,
        public tournamentStatusID: number, public tournamentStatus: TournamentStatus) {}
}