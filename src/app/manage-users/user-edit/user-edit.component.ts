import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  
  editForm: FormGroup;
  selectedUser: User = null;
  selectedUserID: number = 0;

  constructor(private route: ActivatedRoute, private _userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedUserID = params['id'];
    });

    //kan zijn dat dit nog unsubscribed moet worden
    this._userService.getUserById(this.selectedUserID).subscribe((user: User) => {
      this.selectedUser = user;
      const birthDateSubstr = user.birthDate.toString().substring(0,10);
      const birthYear = +birthDateSubstr.substring(0,4);
      const birthMonth = +birthDateSubstr.substring(5,7);
      const birthDay = +birthDateSubstr.substring(8,10);

      // console.log('Birth Year: ' + birthYear);
      // console.log('Birth Month: ' + birthMonth);
      // console.log('Birth Day: ' + birthDay);

      const convertedBirthDate = {year: birthYear, month: birthMonth, day: birthDay};
      // console.log(convertedBirthDate);

      this.editForm.controls['firstName'].setValue(user.firstName);
      this.editForm.controls['lastName'].setValue(user.lastName);
      this.editForm.controls['email'].setValue(user.email);
      this.editForm.controls['birthDate'].setValue(convertedBirthDate);
      // this.editForm.controls['password'].setValue(user.password);
      this.editForm.controls['roleID'].setValue(user.roleID);
    })

    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required]],
      // password: ['', [Validators.required]],
      roleID: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.selectedUser.birthDate = this.editForm.controls['birthDate'].value;
    console.log(this.selectedUser.birthDate);
  }

}
