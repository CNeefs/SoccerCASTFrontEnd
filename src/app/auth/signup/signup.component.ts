import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

import { UserSignup } from '../models/user-signup.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  model: NgbDateStruct;

  userSignupSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
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

    const userSignup = new UserSignup(
      value.firstname,
      value.lastname,
      value.email,
      value.password,
      convertedBirthdate
    )
    console.log(userSignup);
    this.userSignupSub = this.authService.signup(userSignup).subscribe();
  }

  ngOnDestroy(): void {
    if(this.userSignupSub) {
      this.userSignupSub.unsubscribe();
    }
  }
}
