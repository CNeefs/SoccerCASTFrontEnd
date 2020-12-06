import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';

import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-manage-users-list',
  templateUrl: './manage-users-list.component.html',
  styleUrls: ['./manage-users-list.component.scss']
})
export class ManageUsersListComponent implements OnInit {

  users: User[];

  pageLoaded: boolean = false;

  userSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.userSub = this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.pageLoaded = true;
    })
  }

  onNewUser() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

}
