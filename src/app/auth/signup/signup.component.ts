import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

import { User } from '../../models/user.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
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

    const user = new User(0, value.firstname, value.lastname, value.email, value.password, null, convertedBirthdate, 0, 0, 1, null)
    console.log(user);
    //Unsubscribe nodig?
    this.userSignupSub = this.authService.signup(user).subscribe();
  }

  ngOnDestroy(): void {
    if(this.userSignupSub) {
      this.userSignupSub.unsubscribe();
    }
  }
}
