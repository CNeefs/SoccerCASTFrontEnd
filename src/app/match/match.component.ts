import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Match } from '../models/match.model';
import { MatchService } from '../services/match.service';
import { ToastService } from '../toast/services/toast.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  currentMatch: Match;
  currentMatchId: number;
  matchLoaded: boolean;

  constructor(private _matchService: MatchService, private route: ActivatedRoute, private router: Router, private _toastService: ToastService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentMatchId = params['id'];
    });

    this._matchService.getMatchByMatchId(this.currentMatchId).subscribe((match: Match) => {
      this.currentMatch = match;
      console.log(this.currentMatch);
      this.matchLoaded = true;
    }, err => {
      this.router.navigate(['not-found']);
    });
  }

  stopMatch() {
    if (this.currentMatch.score1 != this.currentMatch.score2) {
      this.currentMatch.matchStatusID = 1;
      this._matchService.editMatch(this.currentMatch.matchID, this.currentMatch).subscribe(() => {
        this.router.navigate(['user/teams']);
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
