import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Team } from 'src/app/models/team.model';
import { UserTeam } from 'src/app/models/user-team.model';
import { User } from 'src/app/models/user.model';
import { TeamService } from 'src/app/services/team.service';
import { UserTeamService } from 'src/app/services/user-team.service';
import { MatchService } from 'src/app/services/match.service';
import { Match } from 'src/app/models/match.model';
import { Competition } from 'src/app/models/competition.model';
import { Tournament } from 'src/app/models/tournament.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamStatus } from 'src/app/models/team-status.model';
import { TeamStatusService } from '../../services/team-status.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/toast/services/toast.service';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'src/app/models/table.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss', '../../styles/table_style.scss',  '../../styles/validation_style.scss']
})
export class TeamDetailComponent implements OnInit, OnDestroy {
 
  challengeTeamForm: FormGroup;
  changeStatusForm: FormGroup;
  acceptChallengeForm: FormGroup;
  selectedTeamID: number = 0;
  selectedTeam: Team = null;
  selectedMatch: Match = null;

  currentUser: User;
  usersInTeam: User[];
  allMatches: Match[];
  plannedMatches: Match[] = [];
  requestMatches: Match[] = [];
  friendlyMatches: Match[] = [];
  competitions: Competition[] = [];
  competitionsIds: Number[];
  tournaments: Tournament[] = [];
  tournamentIds: Number[];
  teamStatuses: TeamStatus[] = [];
  tables: Table[] = [];

  teams: Team[] = [];
  usersInSelectedTeam: User[] = [];

  currentTab: string = "profile-users";
  currentLink: string = "link-users";

  pageLoaded: boolean = false;

  userTeams: Team[] = [];
  userTeam: UserTeam = null;

  filename = '';
  userSub: Subscription;

  constructor(
    private _tableService: TableService,
    private _userTeamService: UserTeamService, 
    private _teamService: TeamService, 
    private _authService: AuthService, 
    private _matchService: MatchService, 
    private route: ActivatedRoute, 
    private router: Router,
    private _modalService: NgbModal,
    private _toastService: ToastService,
    private _teamStatusService: TeamStatusService,
    private fb: FormBuilder) { }

  challengeTeam() {
    var match = new Match(0, 0, 0, new Date(), Number(this.challengeTeamForm.controls["tableID"].value), null, 1, null, Number(this.challengeTeamForm.controls["userTeamID"].value),
    null, Number(this.selectedTeamID), null, Number(this.challengeTeamForm.controls["usersInTeamID1"].value), null, Number(this.challengeTeamForm.controls["usersInTeamID2"].value), 
    null, null, null, null, null, 2, null, null, null, null, null);
    this._matchService.addMatch(match).subscribe();
    this._modalService.dismissAll();
    this._toastService.show("Challenge send", {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true
    });
  }

  acceptMatch() {
    this.selectedMatch.player3ID = Number(this.acceptChallengeForm.controls["usersInTeamID1"].value);
    this.selectedMatch.player4ID = Number(this.acceptChallengeForm.controls["usersInTeamID2"].value);
    this._matchService.acceptMatch(this.selectedMatch.matchID, this.selectedMatch).subscribe(res => {
      this._modalService.dismissAll();
      this.ngOnInit();
    });
  }

  declineMatch(match: Match) {
    this._matchService.deleteMatch(match.matchID).subscribe();
    this.requestMatches.splice(this.requestMatches.indexOf(match));
  }

  cancelMatch(match: Match) {
    this._matchService.cancelMatch(match.matchID, match).subscribe(res => {
      this.ngOnInit();
    });
  }

  startMatch(match: Match) {
    match.date = new Date();
    this._matchService.startMatch(match.matchID, match).subscribe(res => {
      this.ngOnInit();
      //navigate to match start page
    });
  }

  goToMatch(match: Match) {
    //navigate to match start page
  }

  onChangeTeam(teamID) {
    this.usersInSelectedTeam = [];
    this.teams.map(team => {
      if (team.teamID == teamID) {
        team.users.map(user => {
          this.usersInSelectedTeam.push(user);
        });
      }
    });
    this.challengeTeamForm.controls["usersInTeamID1"].setValue("");
    this.challengeTeamForm.controls["usersInTeamID2"].setValue("");
  }

  goToEdit(team: Team) {
    this.router.navigate(['user/teams/edit'], { queryParams: { id: team.teamID }});
  }

  openChallengeTeamModal(contentChallengeTeamModal) {
    this._modalService.open(contentChallengeTeamModal);
  }

  openChangeStatusModal(selectedTeam: Team, contentChangeStatusModal) {
    this._modalService.open(contentChangeStatusModal)
  }

  openProfilePictureModal(contentChangeProfilePictureModal) {
    this._modalService.open(contentChangeProfilePictureModal);
  }

  openAcceptChallengeModal(match: Match, contentAcceptChallengeModal) {
    this.selectedMatch = match;
    this._modalService.open(contentAcceptChallengeModal);
  }

  onSubmit() {
    const value = this.changeStatusForm.value;
    const teamStatusID = value.teamStatusID;
    this.selectedTeam.teamStatusID = +teamStatusID;
    this._teamService.editTeam(this.selectedTeam.teamID, this.selectedTeam).subscribe();
    this._modalService.dismissAll();
    this._toastService.show("Team status changed", {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true
    });
    this.ngOnInit();
  }

  goToUserPage(user: User) {
    this.router.navigate(['user/profile'], { queryParams: { id: user.userID } });
  }

  joinTeam(team: Team) {
    this._teamService.joinTeam(this.currentUser.userID, team).subscribe();
    this.ngOnInit();
  }

  leaveTeam(team: Team) {
    this._userTeamService.leaveTeam(this.userTeam.userTeamID).subscribe();
    this.ngOnInit();
  }

  askJoinTeam(team: Team) {
    this._teamService.joinReviewTeam(this.currentUser.userID, team).subscribe();
    this.ngOnInit();
  }

  disbandTeam(team: Team) {
    this._teamService.deleteTeamById(this.selectedTeamID).subscribe();
    this.router.navigate(['user/teams']);
  }

  goToCompetitionDetails(competition: Competition) {
    this.router.navigate(['user/teams']);
  }

  goToTournamentDetails(tournament: Tournament) {
    this.router.navigate(['user/teams']);
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
    this.allMatches = [];
    this.plannedMatches = [];
    this.requestMatches = [];
    this.friendlyMatches = [];
    this.competitions = [];
    this.competitionsIds = [];
    this.tournaments = [];
    this.tournamentIds = [];
    this.currentTab = "profile-users";
    this.currentLink = "link-users";
    this.userTeams = [];
    this.pageLoaded = false;
    this.userSub = this._authService.user.subscribe((user: User) => {
      if (user) {
        this.route.queryParams.subscribe(params => {
          this.selectedTeamID = params['id'];
        });
        this._teamService.getTeams().subscribe(res => {
          this.teams = res;
          this._tableService.getTables().subscribe(res => {
            this.tables = res;
            this._userTeamService.getUserTeamsByUserId(this.currentUser.userID).subscribe(res => { 
              res.map(team => {
                if (team.teamID != this.selectedTeamID) this.userTeams.push(team);
              })
              this.challengeTeamForm = this.fb.group({
                tableID: ['', Validators.required],
                userTeamID: ['', Validators.required],
                usersInTeamID1: ['', Validators.required],
                usersInTeamID2: ['', Validators.required]
              }, {
                validator: this.mustNotMatch('usersInTeamID1', 'usersInTeamID2')
              });
            });
          });
        });
        this.currentUser = user;
        this._teamService.getTeamById(this.selectedTeamID).subscribe(team => {
          this.selectedTeam = team;
          this.changeStatusForm = this.fb.group({
            teamStatusID: [this.selectedTeam.teamStatusID, Validators.required],
          });
          this._userTeamService.getUsersTeamByTeamId(this.selectedTeamID).subscribe(users => {
            this.usersInTeam = users;
            this.acceptChallengeForm = this.fb.group({
              usersInTeamID1: ['', Validators.required],
              usersInTeamID2: ['', Validators.required]
            }, {
              validator: this.mustNotMatch('usersInTeamID1', 'usersInTeamID2')
            });
            this._userTeamService.userTeams(user.userID, this.selectedTeamID).subscribe(res => {
              this.userTeam = res;
              this._matchService.getMatchesByTeamId(this.selectedTeamID).subscribe(matches => {
                this.allMatches = matches;
                this.competitionsIds = [];
                this.tournamentIds = [];
                matches.forEach(match => {
                  if (match.tournamentID == null && match.competitionID == null && (match.matchStatusID == 6 || match.matchStatusID == 5)) this.plannedMatches.push(match);
                  if (match.tournamentID == null && match.competitionID == null && match.matchStatusID == 2 && this.selectedTeam.teamID != match.team1ID) this.requestMatches.push(match);
                  if (match.tournamentID == null && match.competitionID == null && (match.matchStatusID == 4 || match.matchStatusID == 3)) this.friendlyMatches.push(match);
                  if (match.tournamentID == null && match.competitionID != null && !this.competitionsIds.some(x => x === match.competitionID)) {
                     this.competitions.push(match.competition);
                     this.competitionsIds.push(match.competitionID);
                  }
                  if (match.tournamentID != null && match.competitionID == null && !this.tournamentIds.some(x => x === match.tournamentID)) {
                     this.tournaments.push(match.tournament);
                     this.tournamentIds.push(match.tournamentID);
                  }
                });
                this._teamStatusService.getTeamStatuses().subscribe((teamStatuses: TeamStatus[]) => {
                  this.teamStatuses = teamStatuses;
                  this.pageLoaded = true;
                })
              });
            });
          });
        });
      }
    });
  }

  mustNotMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustNotMatch) {
          return;
      }

      if (control.value == matchingControl.value) {
          matchingControl.setErrors({ mustNotMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
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

    this._teamService
      .upload(formData, this.selectedTeamID)
      .subscribe(({path}) => (this.selectedTeam.imagePath = path));
      this._modalService.dismissAll();
  }
}
