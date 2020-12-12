import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ToastService } from 'src/app/toast/services/toast.service';
import { AuthService } from '../auth/auth.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss', '../styles/table_style.scss']
})
export class ManageUsersComponent implements OnInit, OnDestroy {

  users: Observable<User[]>;
  usersLength: number = 0;
  sortedUsers: User[];
  currentUser: User;
  loggedInUser: User;

  pageLoaded: boolean = false;

  userSub: Subscription;
  deleteUserSub: Subscription;
  getLoggedInUserSub: Subscription;

  constructor(
    private router: Router,
    private _modalService: NgbModal,
    private _userService: UserService,
    private toastService: ToastService,
    private _authService: AuthService) { }

  goToDetails(user: User) {
    this.router.navigate(['user/profile'], { queryParams: { id: user.userID }});
  }

  goToCreate() {
    this.router.navigate(['admin/users/create']);
  }

  goToEdit(user: User) {
    this.router.navigate(['admin/users/edit'], { queryParams: { id: user.userID } });
  }

  openDeleteUser(user: User, contentDeleteModel) {
    this.currentUser = user;
    this._modalService.open(contentDeleteModel)
  }

  deleteUser(user: User) {
    if (user.userID != this.loggedInUser.userID) {
      this.deleteUserSub = this._userService.deleteUserById(user.userID).subscribe();
      this.users = this.users.pipe(
        map(res => res.filter(u => u.userID != user.userID))
      );
      this._modalService.dismissAll();
      this.toastService.show('Deleted user ' + user.firstName + ' ' + user.lastName, {
        classname: 'bg-success text-light',
        delay: 2000,
        autohide: true
      });
    }
    else {
      console.log('deletedUser:', user);
      console.log('loggedInUser:', this.loggedInUser);
      this._modalService.dismissAll();
      this.toastService.show("You can't delete yourself!", {
        classname: 'bg-danger text-light',
        delay: 2000,
        autohide: true
      });
    }

  }

  ngOnInit(): void {
    this.users = this._userService.getUsers();
    this.users.subscribe(users => {
      this.sortedUsers = users;
      this.usersLength = users.length;
    });
    this.userSub = this.users.subscribe(result => this.pageLoaded = true)
    this.getLoggedInUserSub = this._authService.user.subscribe((user: User) => {
      this.loggedInUser = user;
    });
  }

  ngOnDestroy() {
    if (this.deleteUserSub) {
      this.deleteUserSub.unsubscribe();
    }
    this.userSub.unsubscribe();
    this.getLoggedInUserSub.unsubscribe();
  }

  //sorting
  sortData(sort: Sort) {
    const data = this.sortedUsers.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedUsers = data;
      return;
    }

    this.sortedUsers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      let birthDateA: Date = new Date(a.birthDate);
      let birthDateB: Date = new Date(b.birthDate);
      let birthDateATime: number = birthDateA.getTime();
      let birthDateBTime: number = birthDateB.getTime();
      switch (sort.active) {
        case 'firstName': return compare(a.firstName, b.firstName, isAsc);
        case 'lastName': return compare(a.lastName, b.lastName, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'birthDate': return compare(birthDateATime, birthDateBTime, isAsc);
        case 'roles': return compare(a.roles[0].name, b.roles[0].name, isAsc);
        default: return 0;
      }
    });

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }

}
