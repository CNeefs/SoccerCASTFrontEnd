import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';
import { UserTeamService } from '../services/user-team.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss', '../styles/table_style.scss']
})
export class MyProfileComponent implements OnInit, OnDestroy {

  user: User;
  userTeams: Team[];
  userBirthday: string;
  userLoaded: boolean = false;
  statisticsLoaded: boolean = true;

  userSub: Subscription;
  userTeamSub: Subscription;

  totalGames: number;
  wonPercent: number;
  lostPercent: number;
  totalPercent: number;

  constructor(private _authService: AuthService, private _userTeamService: UserTeamService) { }

  ngOnInit(): void {
    this.userSub = this._authService.user.subscribe((user: User) => {
      this.user = user
      // console.log(this.user)
      let StrUserBirtDay = user.birthDate.toString();
      this.userBirthday = StrUserBirtDay.substr(0, 10)
      this.calculateStatistics()
      this.userTeamSub = this._userTeamService.getUserTeamsByUserId(user.userID).subscribe((teams: Team[]) => {
        this.userTeams = teams;
        this.userLoaded = true;
      })
    });
  }

  calculateStatistics(): void {
    this.totalGames = +this.user.timesWon + +this.user.timesLost;
    if (this.totalGames == 0) {
      this.wonPercent = 0;
      this.lostPercent = 0;
      this.totalPercent = 0;
      this.statisticsLoaded = true;
    } else {
      this.wonPercent = Math.floor((+this.user.timesWon / +this.totalGames) * 100)
      this.lostPercent = Math.floor((+this.user.timesLost / +this.totalGames) * 100)
      this.totalPercent = 100;
      this.statisticsLoaded = true;
    }
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
