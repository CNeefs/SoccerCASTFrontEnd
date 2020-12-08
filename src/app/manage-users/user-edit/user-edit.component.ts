import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss', '../../styles/validation_style.scss']
})
export class UserEditComponent implements OnInit {
  
  editForm: FormGroup;
  selectedUser: User = null;
  selectedUserID: number = 0;

  roles: Observable<Role[]>
  allRoles: Role[] = [];

  constructor(
    private route: ActivatedRoute, 
    private _userService: UserService, 
    private fb: FormBuilder, 
    private router: Router,
    private _roleService: RoleService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedUserID = params['id'];
    });

    this.roles = this._roleService.getRoles();
    this.roles.pipe(map(res => res.map(role => {
      this.allRoles.push(new Role(role.roleID, role.name));
      return role;
    }))).subscribe();

    //kan zijn dat dit nog unsubscribed moet worden
    this._userService.getUserById(this.selectedUserID).subscribe((user: User) => {
      this.selectedUser = user;

      const birthDateSubstr = user.birthDate.toString().substring(0,10);
      const birthYear = +birthDateSubstr.substring(0,4);
      const birthMonth = +birthDateSubstr.substring(5,7);
      const birthDay = +birthDateSubstr.substring(8,10);

      const convertedBirthDate = {year: birthYear, month: birthMonth, day: birthDay};

      const userRoles = user.roles;
      const roleIds: string[] = []

      for(let role of userRoles){
         roleIds.push(role.roleID.toString());
      }

      this.editForm = this.fb.group({
        firstName: [user.firstName, Validators.required],
        lastName: [user.lastName, Validators.required],
        email: [user.email, [Validators.required, Validators.email]],
        birthDate: [convertedBirthDate, [Validators.required]],
        roles: [roleIds, [Validators.required]]
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

    this.selectedUser.roles = [];
    this.editForm.controls['roles'].value.forEach(editRole => {
      this.allRoles.forEach(role => {
        if (+editRole == role.roleID){
          this.selectedUser.roles.push(new Role(role.roleID, role.name));
        }
      });
    });
    //kan zijn dat dit nog unsubscribed moet worden
    this._userService.editUser(this.selectedUserID, this.selectedUser).subscribe();
    this.router.navigate(['admin/users']);
  }

}
