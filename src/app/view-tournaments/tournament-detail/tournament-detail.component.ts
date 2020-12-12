import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Tournament } from 'src/app/models/tournament.model';
import { User } from 'src/app/models/user.model';
import { TournamentTeam } from 'src/app/models/tournament-team.models';
import { MatchService } from 'src/app/services/match.service';
import { TournamentTeamService } from 'src/app/services/tournament-team.service';
import { ToastService } from 'src/app/toast/services/toast.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { Team } from 'src/app/models/team.model';
import { UserTeamService } from 'src/app/services/user-team.service';
import { UserTeam } from 'src/app/models/user-team.model';
import { TeamService } from 'src/app/services/team.service';
import { Match } from 'src/app/models/match.model';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss', '../../styles/table_style.scss',  '../../styles/validation_style.scss']
})
export class TournamentDetailComponent implements OnInit, OnDestroy {

  joinTournamentForm: FormGroup;
  selectedTournamentID: number = 0;
  selectedTournament: Tournament = null;
  
  currentUser: User;
  tournamentTeams: TournamentTeam[] = [];

  currentTab: string = "tournament-bracket";
  currentLink: string = "link-bracket";

  tournamentLoaded: boolean = false;
  teamsLoaded: boolean = false;
  matchesLoaded: boolean = false;
  
  teams: Team[] = [];
  usersInSelectedTeam: User[] = [];
  registeredTeamIds: Number[];
  allMatches: Match[];
  
  userSub: Subscription;

  userTeams: Team[] = [];
  userTeam: UserTeam = null;

  constructor(private _tournamentTeamService: TournamentTeamService, private _userTeamService: UserTeamService, private _authService: AuthService, private _matchService: MatchService, private _tournamentService: TournamentService,
    private _teamService: TeamService, private route: ActivatedRoute, private router: Router, private _modalService: NgbModal, private _toastService: ToastService, private fb: FormBuilder) { }

  goToTeam(team: Team) {
    this.router.navigate(['user/teams/detail'], { queryParams: { id: team.teamID } });
  }

  openJoinTournamentModal(contentJoinTournamentModal) {
    this._modalService.open(contentJoinTournamentModal);
  }

  joinTournament() {
    this._tournamentService.getTournamentById(this.selectedTournamentID).subscribe(tournament => {
      this.selectedTournament = tournament;
      this.tournamentLoaded = true;
      if (this.selectedTournament.total_Joined < this.selectedTournament.match_Count) {
        var tournamentTeam = new TournamentTeam(0, Number(this.selectedTournamentID), Number(this.joinTournamentForm.controls["userTeamID"].value), null,
        Number(this.joinTournamentForm.controls["usersInTeamID1"].value), null, Number(this.joinTournamentForm.controls["usersInTeamID2"].value), null);
        this._tournamentTeamService.addTournamentTeam(tournamentTeam).subscribe(res => {
          this._modalService.dismissAll();
          this.ngOnInit();
        });
      }
    });
  }

  startMatch(match: Match) {
    match.date = new Date();
    this._matchService.startMatch(match.matchID, match).subscribe(res => {
      this.goToMatch(match);
    });
  }

  acceptScore(match: Match) {
    this._matchService.acceptScore(match.matchID, match).subscribe(res => {
      this.getMatches();
    });
  }

  declineScore(match: Match) {
    this._matchService.startMatch(match.matchID, match).subscribe(res => {
      this.getMatches();
    });
  }

  goToMatch(match: Match) {
    this.router.navigate(['user/match'], {queryParams: {id: match.matchID}});
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

  onChangeTeam(teamID) {
    this.usersInSelectedTeam = [];
    this.teams.map(team => {
      if (team.teamID == teamID) {
        team.users.map(user => {
          this.usersInSelectedTeam.push(user);
        });
      }
    });
    this.joinTournamentForm.controls["usersInTeamID1"].setValue("");
    this.joinTournamentForm.controls["usersInTeamID2"].setValue("");
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.teams = [];
    this.usersInSelectedTeam = [];
    this.userTeams = [];
    this.currentTab = "tournament-bracket";
    this.currentLink = "link-bracket";
    this.userSub = this._authService.user.subscribe((user: User) => {
      if (user) {
        this.currentUser = user;
        this.route.queryParams.subscribe(params => {
          this.selectedTournamentID = params['id'];
        });
        this._teamService.getTeams().subscribe(res => {
          this.teams = res;
        });
        this._tournamentTeamService.getTournamentTeams(this.selectedTournamentID).subscribe(res => {
          this.tournamentTeams = res;
          this.registeredTeamIds = [];
          res.forEach(team => {
              this.registeredTeamIds.push(team.teamID);
          });
          this._userTeamService.getUserTeamsByUserId(this.currentUser.userID).subscribe(res => { 
            res.map(team => {
              if (!this.registeredTeamIds.some(x => x === team.teamID)) this.userTeams.push(team);
            })
            this.joinTournamentForm = this.fb.group({
              userTeamID: ['', Validators.required],
              usersInTeamID1: ['', Validators.required],
              usersInTeamID2: ['', Validators.required]
            }, {
              validator: this.mustNotMatch('usersInTeamID1', 'usersInTeamID2')
            });
          });
          this.teamsLoaded = true;
        });
        this._tournamentService.getTournamentById(this.selectedTournamentID).subscribe(tournament => {
          this.selectedTournament = tournament;
          this.tournamentLoaded = true;
          this.getMatches();
        });
      }
    });
  }

  getMatches() {
    this.allMatches = [];
    this._matchService.getMatchesByTournamentId(this.selectedTournamentID).subscribe(matches => {
      this.allMatches = matches;
      this.matchesLoaded = true;
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
}
