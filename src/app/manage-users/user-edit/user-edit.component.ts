import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss', '../../styles/validation_style.scss']
})
export class UserEditComponent implements OnInit {
  
  editForm: FormGroup;
  selectedUser: User = null;
  selectedUserID: number = 0;

  constructor(private route: ActivatedRoute, private _userService: UserService, private fb: FormBuilder, private router: Router) { }

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

      const convertedBirthDate = {year: birthYear, month: birthMonth, day: birthDay};

      // this.editForm.controls['firstName'].setValue(user.firstName);
      // this.editForm.controls['lastName'].setValue(user.lastName);
      // this.editForm.controls['email'].setValue(user.email);
      // this.editForm.controls['birthDate'].setValue(convertedBirthDate);
      // this.editForm.controls['password'].setValue(user.password);
      // this.editForm.controls['roleID'].setValue(user.roleID);

      this.editForm = this.fb.group({
        firstName: [user.firstName, Validators.required],
        lastName: [user.lastName, Validators.required],
        email: [user.email, [Validators.required, Validators.email]],
        birthDate: [convertedBirthDate, [Validators.required]],
        // password: [user.password, [Validators.required]],
        //roleID: [user.roleID, [Validators.required]],
      });
    }, error => {
      this.router.navigate(['admin/users']);
    });
  }

  onSubmit() {
    const birthdate = this.editForm.controls['birthDate'].value;

    const year = +birthdate.year;
    const month = +birthdate.month;
    const day = +birthdate.day;

    const convertedBirthdate = new Date(year, month-1, day+1, 0, 0, 0, 0)

    this.selectedUser.firstName = this.editForm.controls['firstName'].value;
    this.selectedUser.lastName = this.editForm.controls['lastName'].value;
    this.selectedUser.email = this.editForm.controls['email'].value;
    this.selectedUser.birthDate = convertedBirthdate;
    //this.selectedUser.roleID = +this.editForm.controls['roleID'].value;
    
    console.log("selectedUser:", this.selectedUser);

    //kan zijn dat dit nog unsubscribed moet worden
    this._userService.editUser(this.selectedUserID, this.selectedUser).subscribe();
    this.router.navigate(['admin/users']);
  }

}
