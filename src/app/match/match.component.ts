import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Match } from '../models/match.model';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit, OnDestroy {
  currentMatch: Match;
  currentMatchId: number;
  matchLoaded: boolean;

  getCurrentMatchSub: Subscription;
  changeScore1AddSub: Subscription;
  changeScore1RemoveSub: Subscription;
  changeScore2AddSub: Subscription;
  changeScore2RemoveSub: Subscription;
  stopMatchSub: Subscription;

  constructor(
    private _matchService: MatchService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.currentMatchId = params['id'];
      });

    this.getCurrentMatchSub = this._matchService.getMatchByMatchId(this.currentMatchId).subscribe((match: Match) => {
      this.currentMatch = match;
      console.log(this.currentMatch);
      this.matchLoaded = true;
    }, err => {
      this.router.navigate(['not-found']);
    });
  }

  stopMatch() {
    this.currentMatch.matchStatusID = 1;
    this.stopMatchSub = this._matchService.editMatch(this.currentMatch.matchID, this.currentMatch).subscribe(() => {
      this.router.navigate(['user/teams']);
    });
  }

  changeScore1Add() {
    this.currentMatch.score1++;
    this.changeScore1AddSub = this._matchService.editMatch(this.currentMatch.matchID, this.currentMatch).subscribe();
    this.ngOnInit();
  }

  changeScore1Remove() {
    if(this.currentMatch.score1 > 0) {
      this.currentMatch.score1--;
      this.changeScore1RemoveSub = this._matchService.editMatch(this.currentMatch.matchID, this.currentMatch).subscribe();
      this.ngOnInit();
    }
  }

  changeScore2Add() {
    this.currentMatch.score2++;
    this.changeScore2AddSub = this._matchService.editMatch(this.currentMatch.matchID, this.currentMatch).subscribe();
    this.ngOnInit();
  }

  changeScore2Remove() {
    if(this.currentMatch.score2 > 0) {
      this.currentMatch.score2--;
      this.changeScore2RemoveSub = this._matchService.editMatch(this.currentMatch.matchID, this.currentMatch).subscribe();
      this.ngOnInit();
    }
  }

  ngOnDestroy() {
    this.getCurrentMatchSub.unsubscribe();

    if (this.changeScore1AddSub) {
      this.changeScore1AddSub.unsubscribe();
    }

    if (this.changeScore1RemoveSub) {
      this.changeScore1RemoveSub.unsubscribe();
    }

    if (this.changeScore2AddSub) {
      this.changeScore2AddSub.unsubscribe();
    }

    if (this.changeScore2RemoveSub) {
      this.changeScore2RemoveSub.unsubscribe();
    }

    if (this.stopMatchSub) {
      this.stopMatchSub.unsubscribe();
    }
  }

}
