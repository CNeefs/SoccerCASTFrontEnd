import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { UserTeam } from 'src/app/models/user-team.model';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { UserTeamService } from 'src/app/services/user-team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss', '../../styles/table_style.scss', '../../styles/validation_style.scss']
})
export class TeamEditComponent implements OnInit {

  editForm: FormGroup;
  selectedTeamID: number = 0;
  selectedTeam: Team = null;

  currentUser: User;

  pageLoaded: boolean = false;

  usersTeam: Observable<User[]>;
  usersReview: Observable<User[]>;

  constructor(private _teamService: TeamService, private _userService: UserService, private _userTeamService: UserTeamService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private _modalService: NgbModal) { }

  onSubmit() {
    this.selectedTeam.teamName = this.editForm.controls['teamName'].value;
    this.selectedTeam.companyName = this.editForm.controls['companyName'].value;
    this.selectedTeam.location = this.editForm.controls['location'].value;
    this._teamService.editTeam(this.selectedTeamID, this.selectedTeam).subscribe();
    this.router.navigate(['admin/teams']);
  }

  promoteToCaptain(user: User) {
    this.selectedTeam.captainID = user.userID;
    this._teamService.editTeam(this.selectedTeamID, this.selectedTeam).subscribe();
  }

  openRemoveFromTeam(user: User, contentDeleteModel) {
    this.currentUser = user;
    this._modalService.open(contentDeleteModel)
  }

  removeFromTeam(user: User) {
    this._userTeamService.declineUser(user.userID, this.selectedTeam.teamID).subscribe();
    this.usersTeam = this.usersTeam.pipe(map(res => res.filter(u => u.userID != user.userID)));
    this._modalService.dismissAll();
  }

  declineUser(user: User) {
    this._userTeamService.declineUser(user.userID, this.selectedTeam.teamID).subscribe();
    this.usersReview = this.usersReview.pipe(map(res => res.filter(u => u.userID != user.userID)));
  }

  approveUser(user: User) {
    var newUserTeam = new UserTeam(0,user.userID, null, this.selectedTeam.teamID, null, 1, null);
    this._userTeamService.approveUser(newUserTeam).subscribe();
    this.usersTeam = this.usersTeam.pipe(
      map(users => {
        return users.map(u => {
          return {
            ...u,
            user
          }
        })
      })
    );
    this.usersReview = this.usersReview.pipe(map(res => res.filter(u => u.userID != user.userID)));
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedTeamID = params['id'];
    });
    this._teamService.getTeamById(this.selectedTeamID).subscribe(team => {
      this.selectedTeam = team;
      this.editForm = this.fb.group({
        teamName: [team.teamName, Validators.required],
        companyName: [team.companyName, Validators.required],
        location: [team.location, Validators.required]
      });
      this.pageLoaded = true;
    })
    this.usersTeam = this._userTeamService.getUsersTeamByTeamId(this.selectedTeamID);
    this.usersReview = this._userTeamService.getUsersTeamInReview(this.selectedTeamID);
  }
}
