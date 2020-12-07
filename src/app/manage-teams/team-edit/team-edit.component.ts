import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { UserTeam } from 'src/app/models/user-team.model';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { UserTeamService } from 'src/app/services/user-team.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss']
})
export class TeamEditComponent implements OnInit {

  editForm: FormGroup;
  selectedTeamID: number = 0;
  selectedTeam: Team = null;

  //future: only show users of selected team
  users: Observable<User[]>;
  usersTeam: Observable<User[]>

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
    this._teamService.editTeam(this.selectedTeamID, this.selectedTeam).subscribe();
    this.router.navigate(['admin/teams']);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedTeamID = params['id'];
      console.log(this.selectedTeamID);
      this.usersTeam = this._userTeamService.getUsersTeamByTeamId(this.selectedTeamID);
    });

    this._teamService.getTeamById(this.selectedTeamID).subscribe(team => {
      this.selectedTeam = team;
      this.editForm = this.fb.group({
        teamName: [team.teamName, Validators.required],
        companyName: [team.companyName, Validators.required],
        location: [team.location, Validators.required],
        captainID: [team.captainID, Validators.required]
      });
    })
  }

}
