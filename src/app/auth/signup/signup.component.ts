import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

import { User } from '../../models/user.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../../styles/validation_style.scss']
})
export class SignupComponent implements OnInit {
  model: NgbDateStruct;
  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  currentDate: Date = new Date();
  userRole: Role;

  userSignupSub: Subscription;
  getUserRoleSub: Subscription;

  constructor(
    private authService: AuthService,
    private _roleService: RoleService) { }

  ngOnInit(): void {
    let minDateYear = this.currentDate.getFullYear() - 90;
    let maxDateYear = this.currentDate.getFullYear() - 18;
    this.minDate = {year: minDateYear, month: 1, day: 1};
    this.maxDate = {year: maxDateYear, month: 12, day: 31};
    this.getUserRoleSub = this._roleService.getRoleByRoleId(1).subscribe((role: Role) => {
      this.userRole = role;
    });
  }

  onSubmit(signupForm: NgModel) {
    const value = signupForm.value;

    const year = +value.birthdate.year;
    const month = +value.birthdate.month;
    const day = +value.birthdate.day;

    // console.log(year);
    // console.log(month);
    // console.log(day);

    // Date month is zero based --> min 1 
    const convertedBirthdate = new Date(year, month-1, day+1, 0, 0, 0, 0)
    // const convertedBirthdate: string = year+'-'+month+'-'+day+'T00:00:00'

    const user = new User(0, value.firstname, value.lastname, value.email, value.password, null, convertedBirthdate, 0, 0, [this.userRole], null);
    //Unsubscribe nodig?
    this.authService.signup(user);
  }
}
