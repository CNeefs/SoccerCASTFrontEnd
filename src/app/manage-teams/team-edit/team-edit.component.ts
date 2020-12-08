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
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss']
})
export class TeamEditComponent implements OnInit, OnDestroy {

  editForm: FormGroup;
  selectedTeamID: number = 0;
  selectedTeam: Team = null;

  //future: only show users of selected team
  users: Observable<User[]>;
  usersTeam: Observable<User[]>

  editTeamSub: Subscription;
  addUserTeamSub: Subscription;
  deleteUserTeamSub: Subscription;
  getTeamSub: Subscription;

  constructor(
    private _teamService: TeamService, 
    private _userService: UserService, 
    private _userTeamService: UserTeamService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

  onSubmit() {
    this.selectedTeam.teamName = this.editForm.controls['teamName'].value;
    this.selectedTeam.companyName = this.editForm.controls['companyName'].value;
    this.selectedTeam.location = this.editForm.controls['location'].value;
    this.selectedTeam.captainID = Number(this.editForm.controls['captainID'].value);
    this.editTeamSub = this._teamService.editTeam(this.selectedTeamID, this.selectedTeam).subscribe();
    this.router.navigate(['admin/teams']);
  }

  addUserToTeam(user: User) {
    const newUserTeam = new UserTeam(0,user.userID, null, this.selectedTeam.teamID, null);
    console.log(newUserTeam);
    this.addUserTeamSub = this._userTeamService.addUserTeam(newUserTeam).subscribe();
    this.usersTeam = this.usersTeam.pipe(map(res => res.map((user, i) => {
      if (res.length == i) res.push(user);
      return user;
    })));
  }

  removeUserFromTeam(user: User) {
    this.deleteUserTeamSub = this._userTeamService.deleteUserTeamByUserIdAndTeamId(user.userID, this.selectedTeam.teamID).subscribe();
    this.usersTeam = this.usersTeam.pipe(map(res => res.filter(u => u.userID != user.userID)));
    // this._userTeamService.deleteUserTeamById();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedTeamID = params['id'];
      console.log(this.selectedTeamID);
      this.usersTeam = this._userTeamService.getUsersTeamByTeamId(this.selectedTeamID);
    });

    this.users = this._userService.getUsers();

    this.getTeamSub = this._teamService.getTeamById(this.selectedTeamID).subscribe(team => {
      this.selectedTeam = team;
      this.editForm = this.fb.group({
        teamName: [team.teamName, Validators.required],
        companyName: [team.companyName, Validators.required],
        location: [team.location, Validators.required],
        captainID: [team.captainID, Validators.required]
      });
    })
  }

  ngOnDestroy() {
    if (this.editTeamSub) {
      this.editTeamSub.unsubscribe();
    }

    if (this.addUserTeamSub) {
      this.addUserTeamSub.unsubscribe();
    }

    if (this.deleteUserTeamSub) {
      this.deleteUserTeamSub.unsubscribe();
    }

    this.getTeamSub.unsubscribe();
  }

}
