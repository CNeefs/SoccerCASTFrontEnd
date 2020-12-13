import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/toast/services/toast.service';

@Component({
  selector: 'app-my-profile-edit',
  templateUrl: './my-profile-edit.component.html',
  styleUrls: ['./my-profile-edit.component.scss', '../../styles/validation_style.scss']
})
export class MyProfileEditComponent implements OnInit {

  editForm: FormGroup;
  selectedUser: User = null;
  selectedUserID: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private _userService: UserService, private fb: FormBuilder, private _toastService: ToastService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedUserID = params['id'];
    });

    this._userService.getUserById(this.selectedUserID).subscribe((user: User) => {
      this.selectedUser = user;

      const birthDateSubstr = user.birthDate.toString().substring(0, 10);
      const birthYear = +birthDateSubstr.substring(0, 4);
      const birthMonth = +birthDateSubstr.substring(5, 7);
      const birthDay = +birthDateSubstr.substring(8, 10);

      const convertedBirthDate = { year: birthYear, month: birthMonth, day: birthDay };

      this.editForm = this.fb.group({
        firstName: [user.firstName, Validators.required],
        lastName: [user.lastName, Validators.required],
        email: [user.email, [Validators.required, Validators.email]],
        birthDate: [convertedBirthDate, [Validators.required]],
      });
    }, error => {
      this.router.navigate(['user/profile']);
    });
  }

  onSubmit() {
    const birthdate = this.editForm.controls['birthDate'].value;

    const year = +birthdate.year;
    const month = +birthdate.month;
    const day = +birthdate.day;

    const convertedBirthdate = new Date(year, month - 1, day + 1, 0, 0, 0, 0)

    this.selectedUser.firstName = this.editForm.controls['firstName'].value;
    this.selectedUser.lastName = this.editForm.controls['lastName'].value;
    this.selectedUser.email = this.editForm.controls['email'].value;
    this.selectedUser.birthDate = convertedBirthdate;

    //kan zijn dat dit nog unsubscribed moet worden
    this._userService.editUser(this.selectedUserID, this.selectedUser).subscribe(result => {
      this.router.navigate(['user/profile'], {
        queryParams: {
          id: this.selectedUserID
        }
      });
    }, error => {
        this._toastService.show("This email is already taken", {
            classname: 'bg-danger text-light',
            delay: 3000,
            autohide: true
        });
    });
  }
}
