import { Component, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
import { TeamStatusService } from '../../services/team-status.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastService } from 'src/app/toast/services/toast.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss', '../../styles/table_style.scss']
})
export class TeamDetailComponent implements OnInit {
 
  changeStatusForm: FormGroup;
  selectedTeamID: number = 0;
  selectedTeam: Team = null;

  currentUser: User;
  usersInTeam: User[];
  allMatches: Match[];
  friendlyMatches: Match[] = [];
  competitions: Competition[] = [];
  competitionsIds: Number[];
  tournaments: Tournament[] = [];
  tournamentIds: Number[];
  teamStatuses: TeamStatus[] = [];

  currentTab: string = "profile-users";
  currentLink: string = "link-users";

  pageLoaded: boolean = false;

  userTeam: UserTeam = null;

  filename = '';

  constructor(
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

  goToEdit(team: Team) {
    this.router.navigate(['user/teams/edit'], { queryParams: { id: team.teamID }});
  }

  openChangeStatusModal(selectedTeam: Team, contentChangeStatusModal) {
    this._modalService.open(contentChangeStatusModal)
  }

  openProfilePictureModal(contentChangeProfilePictureModal) {
    this._modalService.open(contentChangeProfilePictureModal);
  }

  onSubmit() {
    const value = this.changeStatusForm.value;
    const teamStatusID = value.teamStatusID;
    console.log(teamStatusID);
    this.selectedTeam.teamStatusID = +teamStatusID;
    console.log(this.selectedTeam);
    this._teamService.editTeam(this.selectedTeam.teamID, this.selectedTeam).subscribe();
    this._modalService.dismissAll();
    this._toastService.show("Team status changed", {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true
    });
  }

  goToUserPage(user: User) {
    this.router.navigate(['user/profile'], { queryParams: { id: user.userID } });
  }

  joinTeam(team: Team) {
    this._teamService.joinTeam(this.currentUser.userID, team).subscribe();
    const currentRoute = this.router.url;
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

  ngOnInit(): void {
    this.pageLoaded = false;
    this._authService.user.subscribe((user: User) => {
      if (user) {
        this.route.queryParams.subscribe(params => {
          this.selectedTeamID = params['id'];
        });
        this.currentUser = user;
        this._teamService.getTeamById(this.selectedTeamID).subscribe(team => {
          this.selectedTeam = team;
          this.changeStatusForm = this.fb.group({
            teamStatusID: [this.selectedTeam.teamStatusID, Validators.required],
          });
          this._userTeamService.getUsersTeamByTeamId(this.selectedTeamID).subscribe(users => {
            this.usersInTeam = users;
            this._userTeamService.userTeams(user.userID, this.selectedTeamID).subscribe(res => {
              this.userTeam = res;
              this._matchService.getMatchesByTeamId(this.selectedTeamID).subscribe(matches => {
                this.allMatches = matches;
                this.competitionsIds = [];
                this.tournamentIds = [];
                matches.forEach(match => {
                  if (match.tournamentID == null && match.competitionID == null) this.friendlyMatches.push(match);
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
