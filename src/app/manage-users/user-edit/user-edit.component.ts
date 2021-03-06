import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/toast/services/toast.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss', '../../styles/validation_style.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {

  editForm: FormGroup;
  selectedUser: User = null;
  selectedUserID: number = 0;

  currentUser: User;
  currentUserLoaded: boolean = false;
  currentUserSub: Subscription;

  roles: Observable<Role[]>
  roleList = [];
  selectedItems = [];

  roleSettings = { dataIdProperty: "idValue", dataNameProperty: "nameValue", headerText: "Roles", noneSelectedBtnText: "No roles selected", btnWidth: "200px", 
    showDeselectAllBtn: true, showSelectAllBtn: true, deselectAllBtnText: 'Deselect', selectAllBtnText: 'Select', btnClasses: 'btn btn-primary btn-sm dropdown-toggle', };

  constructor(private route: ActivatedRoute, private _userService: UserService, private fb: FormBuilder, private router: Router, private _roleService: RoleService, private _authService: AuthService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedUserID = params['id'];
    });

    this.currentUserSub = this._authService.user.subscribe((user: User) => {
      this.currentUser = user;
      this.currentUserLoaded = true;
    })

    this.roles = this._roleService.getRoles();
    this.roles.pipe(map(res => res.map(role => {
      this.roleList.push({ "idValue": role.roleID, "nameValue": role.name});
      return role;
    }))).subscribe();

    this._userService.getUserById(this.selectedUserID).subscribe((user: User) => {
      this.selectedUser = user;

      const birthDateSubstr = user.birthDate.toString().substring(0, 10);
      const birthYear = +birthDateSubstr.substring(0, 4);
      const birthMonth = +birthDateSubstr.substring(5, 7);
      const birthDay = +birthDateSubstr.substring(8, 10);

      const convertedBirthDate = { year: birthYear, month: birthMonth, day: birthDay };

      for (let role of user.roles) {
        this.selectedItems.push({ "idValue": role.roleID, "nameValue": role.name});
      }

      this.editForm = this.fb.group({
        firstName: [user.firstName, Validators.required],
        lastName: [user.lastName, Validators.required],
        email: [user.email, [Validators.required, Validators.email]],
        birthDate: [convertedBirthDate, [Validators.required]],
        roles: [this.selectedItems, [Validators.required]]
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

    const convertedBirthdate = new Date(year, month - 1, day + 1, 0, 0, 0, 0)

    this.selectedUser.firstName = this.editForm.controls['firstName'].value;
    this.selectedUser.lastName = this.editForm.controls['lastName'].value;
    this.selectedUser.email = this.editForm.controls['email'].value;
    this.selectedUser.birthDate = convertedBirthdate;

    this.selectedUser.roles = [];
    this.editForm.controls['roles'].value.forEach(editRole => {
      this.selectedUser.roles.push(new Role(editRole.idValue, editRole.nameValue));
    });

    //kan zijn dat dit nog unsubscribed moet worden
    this._userService.editUser(this.selectedUserID, this.selectedUser).subscribe(res => {
      this.router.navigate(['admin/users']);
    }, error => {
      this.toastService.show('This email adres is already in use', {
        classname: 'bg-danger text-light',
        delay: 2000,
        autohide: true
      });
    });
  }

  ngOnDestroy(): void {
    this.currentUserSub.unsubscribe();
  }
}
