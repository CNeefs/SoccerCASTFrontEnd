import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team.model';
import { UserTeam } from 'src/app/models/user-team.model';
import { User } from 'src/app/models/user.model';
import { TeamService } from 'src/app/services/team.service';
import { UserTeamService } from 'src/app/services/user-team.service';
import { ToastService } from 'src/app/toast/services/toast.service';

@Component({
  selector: 'app-view-team-edit',
  templateUrl: './view-team-edit.component.html',
  styleUrls: ['./view-team-edit.component.scss', '../../styles/table_style.scss']
})
export class ViewTeamEditComponent implements OnInit {
  editForm: FormGroup;
  selectedTeamID: number = 0;
  selectedTeam: Team = null;

  currentUser: User;

  pageLoaded: boolean = false;

  usersTeam: Observable<User[]>;
  usersReview: Observable<User[]>;

  constructor(
    private _teamService: TeamService,
    private _userTeamService: UserTeamService, 
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private router: Router, 
    private _modalService: NgbModal,
    private _toastService: ToastService,
    ) { }

  onSubmit() {
    this.selectedTeam.teamName = this.editForm.controls['teamName'].value;
    this.selectedTeam.companyName = this.editForm.controls['companyName'].value;
    this.selectedTeam.location = this.editForm.controls['location'].value;
    this._teamService.editTeam(this.selectedTeamID, this.selectedTeam).subscribe(res => {
      this._toastService.show("Edited team '" + this.selectedTeam.teamName + "'", {
        classname: 'bg-success text-light',
        delay: 2000,
        autohide: true
      });
      this.router.navigate(['user/teams/detail/'], {queryParams: { id: this.selectedTeam.teamID}});
      this.ngOnInit();
    });
  }

  promoteToCaptain(user: User) {
    this.selectedTeam.captainID = user.userID;
    this._teamService.editTeam(this.selectedTeamID, this.selectedTeam).subscribe(res => {
      this._modalService.dismissAll();
      this.ngOnInit();
    });
  }

  openRemoveFromTeam(user: User, contentDeleteModel) {
    this.currentUser = user;
    this._modalService.open(contentDeleteModel)
  }

  removeFromTeam(user: User) {
    this._userTeamService.declineUser(user.userID, this.selectedTeam.teamID).subscribe(res => {
      this._modalService.dismissAll();
      this.ngOnInit();
    });
  }

  declineUser(user: User) {
    this._userTeamService.declineUser(user.userID, this.selectedTeam.teamID).subscribe(res => {
      this.ngOnInit();
    });
  }

  approveUser(user: User) {
    var newUserTeam = new UserTeam(0,user.userID, null, this.selectedTeam.teamID, null, 1, null);
    this._userTeamService.approveUser(newUserTeam).subscribe(res => {
      this.ngOnInit();
    });
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
      this.usersTeam = this._userTeamService.getUsersTeamByTeamId(this.selectedTeamID);
      this.usersReview = this._userTeamService.getUsersTeamInReview(this.selectedTeamID);
      this.pageLoaded = true;
    }, err => {
      this.router.navigate(['not-found']);
    })
  }
}
