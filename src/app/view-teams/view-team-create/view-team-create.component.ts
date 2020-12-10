import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-view-team-create',
  templateUrl: './view-team-create.component.html',
  styleUrls: ['./view-team-create.component.scss', '../../styles/validation_style.scss']
})
export class ViewTeamCreateComponent implements OnInit {

  currentUser: User;
  createForm: FormGroup;

  constructor(
    private _teamService: TeamService,
    private _authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  onSubmit() {
    var team = new Team(0, this.createForm.controls['teamName'].value, this.createForm.controls['companyName'].value,
    this.createForm.controls['location'].value, this.currentUser.userID, null, 2, null);
    this._teamService.addTeam(team).subscribe(event => {
      if(event.type === HttpEventType.Response) {
        this.router.navigate(['admin/teams']);
      }
    });
  }

  ngOnInit(): void {
    this._authService.user.subscribe((user: User) => {
      this.currentUser = user;
    })
    this.createForm = this.fb.group({
      teamName: ['', Validators.required],
      companyName: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

}
