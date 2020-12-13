import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Match } from '../models/match.model';
import { User } from '../models/user.model';
import { MatchService } from '../services/match.service';
import { ToastService } from '../toast/services/toast.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit, OnDestroy {
  currentMatch: Match;
  currentUser: User;
  currentMatchId: number;
  matchLoaded: boolean;
  teamNameTBD: string = "";

  userSub: Subscription;

  constructor(private _matchService: MatchService, private _authService: AuthService, private route: ActivatedRoute, private router: Router, private _toastService: ToastService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentMatchId = params['id'];
    });
    this.userSub = this._authService.user.subscribe((user: User) => {
      if (user) {
        this.currentUser = user;
        this._matchService.getMatchByMatchId(this.currentMatchId).subscribe((match: Match) => {
          console.log(match);
          this.currentMatch = match;
          if (this.currentMatch.tournamentID != null) {
            if (this.currentMatch.team1ID == null) {
              this.teamNameTBD = "TBD";
            }

            if (this.currentMatch.team2ID == null) {
              this.teamNameTBD = "TBD";
            }
          }
          this.matchLoaded = true;
        }, err => {
          this.router.navigate(['not-found']);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  stopMatch() {
    if (this.currentMatch.score1 != this.currentMatch.score2) {
      this.currentMatch.matchStatusID = 1;
      this._matchService.editMatch(this.currentMatch.matchID, this.currentMatch).subscribe(() => {
        if (this.currentMatch.tournamentID != null) {
          this.router.navigate(['user/tournaments/detail'], {queryParams: {id: this.currentMatch.tournamentID}});
        }
        else if (this.currentMatch.team1ID != null){
          this.router.navigate(['user/teams/detail'], {queryParams: {id: this.currentMatch.team1ID}});
        }
        else if (this.currentMatch.player1ID != null) {
          this.router.navigate(['/user/profile'], {queryParams: {id: this.currentUser.userID}});
        }
        // this.router.navigate(['user/teams']);
        this._toastService.show("Score review has been send", {
          classname: 'bg-success text-light',
          delay: 2000,
          autohide: true
        });
      });
    } else {
      this._toastService.show("Keep playing we don't want any draws", {
        classname: 'bg-danger text-light',
        delay: 2000,
        autohide: true
      });
    }
  }

  changeScore(score: String, operator: string) {
    if (operator == "add") this.currentMatch["score" + score]++;
    if (operator == "remove") this.currentMatch["score" + score]--;
    this._matchService.editMatch(this.currentMatch.matchID, this.currentMatch).subscribe(res => {
      this.ngOnInit();
    });
  }
}
