import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss', '../../styles/validation_style.scss']
})
export class UserCreateComponent implements OnInit {

  createForm: FormGroup;
  roles: Observable<Role[]>
  roleList = [];
  selectedItems = [];
  currentDate: Date = new Date();
  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;

  roleSettings = { dataIdProperty: "idValue", dataNameProperty: "nameValue", headerText: "Roles", noneSelectedBtnText: "No roles selected", btnWidth: "200px", 
    showDeselectAllBtn: true, showSelectAllBtn: true, deselectAllBtnText: 'Deselect', selectAllBtnText: 'Select', btnClasses: 'btn btn-primary btn-sm dropdown-toggle', };

  constructor(private _userService: UserService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private _roleService: RoleService) { }

  onSubmit() {
    const birthdate = this.createForm.controls['birthDate'].value;

    const year = +birthdate.year;
    const month = +birthdate.month;
    const day = +birthdate.day;

    const convertedBirthdate = new Date(year, month-1, day+1, 0, 0, 0, 0)

    var userRoles = [];
    this.createForm.controls['roles'].value.forEach(editRole => {
      userRoles.push(new Role(editRole.idValue, editRole.nameValue));
    });

    var user = new User(0, this.createForm.controls['firstName'].value, this.createForm.controls['lastName'].value, this.createForm.controls['email'].value,
      this.createForm.controls['password'].value, null, convertedBirthdate, 0, 0, userRoles, null, 1, null);
    this._userService.addUser(user).subscribe(event => {
      if(event.type === HttpEventType.Response) {
        this.router.navigate(['admin/users']);
      }
    })
  }

  ngOnInit(): void {
    this.roles = this._roleService.getRoles();
    this.roles.pipe(map(res => res.map(role => {
      this.roleList.push({ "idValue": role.roleID, "nameValue": role.name});
      return role;
    }))).subscribe();

    let minDateYear = this.currentDate.getFullYear() - 90;
    let maxDateYear = this.currentDate.getFullYear() - 18;

    this.minDate = {year: minDateYear, month: 1, day: 1};
    this.maxDate = {year: maxDateYear, month: 12, day: 31};

    this.createForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required]],
      password: ['', [Validators.required]],
      roles: ['', [Validators.required]]
    });
  }

}
 