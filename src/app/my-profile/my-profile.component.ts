import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Competition } from '../models/competition.model';
import { Match } from '../models/match.model';
import { Table } from '../models/table.model';
import { Team } from '../models/team.model';
import { Tournament } from '../models/tournament.model';
import { User } from '../models/user.model';
import { MatchService } from '../services/match.service';
import { TableService } from '../services/table.service';
import { UserTeamService } from '../services/user-team.service';
import { UserService } from '../services/user.service';
import { ToastService } from '../toast/services/toast.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss', '../styles/table_style.scss', '../styles/validation_style.scss']
})
export class MyProfileComponent implements OnInit, OnDestroy {

  challengeUserForm: FormGroup;
  selectedUserID: number = 0;
  selectedUser: User = null;

  currentUser: User;
  allMatches: Match[] = [];
  plannedMatches: Match[] = [];
  requestMatches: Match[] = [];
  friendlyMatches1v1: Match[] = [];
  friendlyMatches2v2: Match[] = [];
  competitions: Competition[] = [];
  competitionsIds: Number[];
  tournaments: Tournament[] = [];
  tournamentIds: Number[];
  tables: Table[] = [];

  currentTab: string = "profile-personal-statistics";
  currentLink: string = "link-personal-statistics";

  userLoaded: boolean = false;
  matchesLoaded: boolean = false;
  userTeamsLoaded: boolean = false;

  userTeams: Team[];
  userBirthday: string;

  totalGames: number;
  wonPercent: number = 0;
  lostPercent: number = 0;
  totalPercent: number = 0;
  filename = '';

  userSub: Subscription;

  constructor(private _tableService: TableService, private _authService: AuthService, private _userTeamService: UserTeamService, private _userService: UserService, 
    private _matchService: MatchService, private route: ActivatedRoute, private router: Router, private _modalService: NgbModal, private fb: FormBuilder, private _toastService: ToastService) { }

  goToEdit(user: User) {
    this.router.navigate(['user/profile/edit'], { queryParams: { id: user.userID } });
  }

  goToTeamPage(team: Team) {
    this.router.navigate(['user/teams/detail'], { queryParams: { id: team.teamID } });
  }

  openChallengeUserModal(contentChallengeUserModal) {
    this._modalService.open(contentChallengeUserModal);
  }

  openProfilePictureModal(contentChangeProfilePictureModal) {
    this._modalService.open(contentChangeProfilePictureModal);
  }

  startMatch(match: Match) {
    match.date = new Date();
    this._matchService.startMatch(match.matchID, match).subscribe(res => {
      this.goToMatch(match);
    });
  }

  goToMatch(match: Match) {
    this.router.navigate(['user/match'], {queryParams: {id: match.matchID}});
  }

  cancelMatch(match: Match) {
    this._matchService.cancelMatch(match.matchID, match).subscribe(res => {
      this.getMatches();
    });
  }

  acceptMatch(match: Match) {
    this._matchService.acceptMatch(match.matchID, match).subscribe(res => {
      this.getMatches();
    });
  }

  declineMatch(match: Match) {
    this._matchService.deleteMatch(match.matchID).subscribe();
    this.requestMatches.splice(this.requestMatches.indexOf(match));
  }

  challengeUser() {
    var match = new Match(0, 0, 0, new Date(), Number(this.challengeUserForm.controls["tableID"].value), null, 2, null, null, null, null, null, this.currentUser.userID, null, null, null, Number(this.selectedUserID),
    null, null, null, 2, null, null, null, null, null);
    this._matchService.addMatch(match).subscribe();
    this._modalService.dismissAll();
    this._toastService.show("Challenge send", {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true
    });
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

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.currentTab = "profile-personal-statistics";
    this.currentLink = "link-personal-statistics";
    this.userTeams = [];
    this.userSub = this._authService.user.subscribe((user: User) => {
      if (user) {
        this.currentUser = user;
        this.route.queryParams.subscribe(params => {
          this.selectedUserID = params['id'];
        });
        this._tableService.getTables().subscribe(res => {
          this.tables = res;
          this.challengeUserForm = this.fb.group({
            tableID: ['', Validators.required],
          });
        });
        this._userService.getUserById(this.selectedUserID).subscribe((user: User) => {
          this.selectedUser = user;
          let StrUserBirtDay = user.birthDate.toString();
          this.userBirthday = StrUserBirtDay.substr(0, 10);
          this.calculateStatistics();
          this.userLoaded = true;
          this.getMatches();
        });
        this._userTeamService.getUserTeamsByUserId(this.selectedUserID).subscribe((teams: Team[]) => {
          this.userTeams = teams;
          this.userTeamsLoaded = true;
        });
      }
    });
  }

  getMatches() {
    this.allMatches = [];
    this.plannedMatches = [];
    this.requestMatches = [];
    this.friendlyMatches1v1 = [];
    this.friendlyMatches2v2 = [];
    this.competitions = [];
    this.tournaments = [];
    this._matchService.getMatchesByUserId(this.selectedUserID).subscribe(matches => {
      this.allMatches = matches;
      this.competitionsIds = [];
      this.tournamentIds = [];
      matches.forEach(match => {
        if (match.tournamentID == null && match.competitionID == null && match.player2ID == null && (match.matchStatusID == 6 || match.matchStatusID == 5)) this.plannedMatches.push(match);
        if (match.tournamentID == null && match.competitionID == null && match.player2ID == null && match.matchStatusID == 2 && this.selectedUser.userID != match.player1ID) this.requestMatches.push(match);
        if (match.tournamentID == null && match.competitionID == null && match.player2ID == null && (match.matchStatusID == 4 || match.matchStatusID == 3)) this.friendlyMatches1v1.push(match);
        if (match.tournamentID == null && match.competitionID == null && match.player2ID != null && (match.matchStatusID == 4 || match.matchStatusID == 3)) this.friendlyMatches2v2.push(match);
        if (match.tournamentID == null && match.competitionID != null && !this.competitionsIds.some(x => x === match.competitionID)) {
           this.competitions.push(match.competition);
           this.competitionsIds.push(match.competitionID);
        }
        if (match.tournamentID != null && match.competitionID == null && !this.tournamentIds.some(x => x === match.tournamentID)) {
           this.tournaments.push(match.tournament);
           this.tournamentIds.push(match.tournamentID);
        }
      });
      this.matchesLoaded = true;
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

  setFilename(files) {
    if (files[0]) {
      this.filename = files[0].name;
    }
  }

  save(files) {
    const formData = new FormData();

    if (files[0]) {
      formData.append(files[0].name, files[0]);
    }

    this._userService
      .upload(formData, this.currentUser.userID)
      .subscribe(({path}) => (this.selectedUser.imagePath = path));
      this._modalService.dismissAll();
  }
}
