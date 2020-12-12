import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
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
  editedUsers: User[] = [];

  pageLoaded: boolean = false;

  userSub: Subscription;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.users = this._userService.getUsers();
    this.userSub = this.users.subscribe(result => {
      result.map((user, index) => {
        this.editedUsers.push(this.calculatePoints(user));
        if(index == result.length-1) {
          this.sortUsers();
          this.pageLoaded = true;
        }
      })
    })
  }

  sortUsers() {
    this.editedUsers.sort(function(a, b) {
      if(a.points < b.points) return 1;
      if(a.points > b.points) return -1;
      return 0;
    })
  }

  calculatePoints(user: User) {
    let timesWon = user.timesWon;
    let timesLost = user.timesLost;
    let total = timesLost + timesWon;

    let pointsRounded = 0;

    if (total != 0) {
      let points = ((timesWon/total) * 100) * timesWon;
      pointsRounded = Math.floor(points);
    }

    user.points = pointsRounded;

    return user;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
