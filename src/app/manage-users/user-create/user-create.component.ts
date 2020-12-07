import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss', '../../styles/validation_style.scss']
})
export class UserCreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(
    private _userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  onSubmit() {

    const birthdate = this.createForm.controls['birthDate'].value;

    const year = +birthdate.year;
    const month = +birthdate.month;
    const day = +birthdate.day;

    const convertedBirthdate = new Date(year, month-1, day+1, 0, 0, 0, 0)

    var user = new User(
      0,
      this.createForm.controls['firstName'].value,
      this.createForm.controls['lastName'].value,
      this.createForm.controls['email'].value,
      this.createForm.controls['password'].value,
      null,
      convertedBirthdate,
      0,
      0,
      +this.createForm.controls['roleID'].value,
      null
    );
    // console.log("user create"+ JSON.stringify(user));
    this._userService.addUser(user).subscribe(event => {
      if(event.type === HttpEventType.Response) {
        this.router.navigate(['admin/users']);
      }
    })
  }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required]],
      password: ['', [Validators.required]],
      roleID: ['', [Validators.required]],
    });
  }

}
