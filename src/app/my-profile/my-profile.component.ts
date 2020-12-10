import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Competition } from '../models/competition.model';
import { Match } from '../models/match.model';
import { Team } from '../models/team.model';
import { Tournament } from '../models/tournament.model';
import { User } from '../models/user.model';
import { MatchService } from '../services/match.service';
import { UserTeamService } from '../services/user-team.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss', '../styles/table_style.scss']
})
export class MyProfileComponent implements OnInit {

  selectedUserID: number = 0;
  selectedUser: User = null;

  currentUser: User;
  allMatches: Match[];
  friendlyMatches1v1: Match[] = [];
  friendlyMatches2v2: Match[] = [];
  competitions: Competition[] = [];
  competitionsIds: Number[];
  tournaments: Tournament[] = [];
  tournamentIds: Number[];

  currentTab: string = "profile-personal-statistics";
  currentLink: string = "link-personal-statistics";

  pageLoaded: boolean = false;

  userTeams: Team[];
  userBirthday: string;

  totalGames: number;
  wonPercent: number = 0;
  lostPercent: number = 0;
  totalPercent: number = 0;

  constructor(private _authService: AuthService, private _userTeamService: UserTeamService, private _userService: UserService, private _matchService: MatchService, private route: ActivatedRoute, private router: Router) { }

  goToEdit(user: User) {
    this.router.navigate(['user/profile/edit'], { queryParams: { id: user.userID } });
  }

  goToTeamPage(team: Team) {
    this.router.navigate(['user/teams/detail'], { queryParams: { id: team.teamID } });
  }

  changeTab(id: string, linkid: string) {
    let currentLink: HTMLElement = document.getElementById(this.currentLink) as HTMLElement;
    currentLink.classList.remove('active');
    currentLink.classList.remove('show');

    let currentTabel: HTMLElement = document.getElementById(this.currentTab) as HTMLElement;
    currentTabel.classList.remove('active');
    currentTabel.classList.remove('show');

    let element: HTMLElement = document.getElementById(id) as HTMLElement;
    element.classList.add("active");
    element.classList.add("show");

    let linkel: HTMLElement = document.getElementById(linkid) as HTMLElement;
    linkel.classList.add("active");
    linkel.classList.add("show");
    this.currentTab = id;
    this.currentLink = linkid;
  }

  ngOnInit(): void {
    this.pageLoaded = false;
    this._authService.user.subscribe((user: User) => {
      if (user) {
        this.route.queryParams.subscribe(params => {
          this.selectedUserID = params['id'];
        });
        this.currentUser = user;
        this._userService.getUserById(this.selectedUserID).subscribe((user: User) => {
          this.selectedUser = user;
          let StrUserBirtDay = user.birthDate.toString();
          this.userBirthday = StrUserBirtDay.substr(0, 10);
          this.calculateStatistics();
          this._userTeamService.getUserTeamsByUserId(this.selectedUserID).subscribe((teams: Team[]) => {
            this.userTeams = teams;
            this._matchService.getMatchesByUserId(this.selectedUserID).subscribe(matches => {
              this.allMatches = matches;
              this.competitionsIds = [];
              this.tournamentIds = [];
              matches.forEach(match => {
                if (match.tournamentID == null && match.competitionID == null && match.player2ID == null) this.friendlyMatches1v1.push(match);
                if (match.tournamentID == null && match.competitionID == null && match.player2ID != null) this.friendlyMatches2v2.push(match);
                if (match.tournamentID == null && match.competitionID != null && !this.competitionsIds.some(x => x === match.competitionID)) {
                   this.competitions.push(match.competition);
                   this.competitionsIds.push(match.competitionID);
                }
                if (match.tournamentID != null && match.competitionID == null && !this.tournamentIds.some(x => x === match.tournamentID)) {
                   this.tournaments.push(match.tournament);
                   this.tournamentIds.push(match.tournamentID);
                }
              });
              this.pageLoaded = true;
            });
          })
        })
      }
    });
  }

  calculateStatistics(): void {
    this.totalGames = +this.selectedUser.timesWon + +this.selectedUser.timesLost;
    if (this.totalGames != 0) {
      this.wonPercent = Math.floor((+this.selectedUser.timesWon / +this.totalGames) * 100)
      this.lostPercent = Math.floor((+this.selectedUser.timesLost / +this.totalGames) * 100)
      this.totalPercent = 100;
    }
  }
}
