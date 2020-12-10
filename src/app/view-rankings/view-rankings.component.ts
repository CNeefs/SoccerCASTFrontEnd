import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-rankings',
  templateUrl: './view-rankings.component.html',
  styleUrls: ['./view-rankings.component.scss', '../styles/table_style.scss']
})
export class ViewRankingsComponent implements OnInit, OnDestroy {

  users: Observable<User[]>;

  pageLoaded: boolean = false;

  userSub: Subscription;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.users = this._userService.getUsers();
    this.userSub = this.users.subscribe(result => this.pageLoaded = true)
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
