import { HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.scss', '../../styles/validation_style.scss']
})
export class TeamCreateComponent implements OnInit, OnDestroy {
  
  createForm: FormGroup;
  users: Observable<User[]>;

  addTeamSub: Subscription;

  constructor(
    private _teamService: TeamService, 
    private _userService: UserService, 
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router) { }

  onSubmit() {
    var team = new Team(0, this.createForm.controls['teamName'].value, this.createForm.controls['companyName'].value,
    this.createForm.controls['location'].value, Number(this.createForm.controls['captainID'].value), null);
    this._teamService.addTeam(team).subscribe(event => {
      if(event.type === HttpEventType.Response) {
        this.router.navigate(['admin/teams']);
      }
    });
  }
  
  ngOnInit(): void {
    this.users = this._userService.getUsers();
    this.createForm = this.fb.group({
      teamName: ['', Validators.required],
      companyName: ['', Validators.required],
      location: ['', Validators.required],
      captainID: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    if (this.addTeamSub) {
      this.addTeamSub.unsubscribe();
    }
  }



}
