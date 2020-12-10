import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ToastService } from 'src/app/toast/services/toast.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss', '../styles/table_style.scss']
})
export class ManageUsersComponent implements OnInit {

  users: Observable<User[]>;
  currentUser: User;

  pageLoaded: boolean = false;

  userSub: Subscription;

  constructor(
    private router: Router, 
    private _modalService: NgbModal, 
    private _userService: UserService,
    private toastService: ToastService) { }

  goToCreate() {
    this.router.navigate(['admin/users/create']);
  }

  goToEdit(user: User) {
    this.router.navigate(['admin/users/edit'], { queryParams: { id: user.userID }});
  }

  openDeleteUser(user: User, contentDeleteModel) {
    this.currentUser = user;
    this._modalService.open(contentDeleteModel)
  }

  deleteUser(user: User) {
    this._userService.deleteUserById(user.userID).subscribe();
    this.users = this.users.pipe(
      map(res => res.filter(u => u.userID != user.userID))
    );
    this._modalService.dismissAll();
    this.toastService.show('Deleted user ' + user.firstName + ' ' + user.lastName, {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true
    });
  }

  ngOnInit(): void {
    this.users = this._userService.getUsers();
    this.userSub = this.users.subscribe(result => this.pageLoaded = true)
  }

}
