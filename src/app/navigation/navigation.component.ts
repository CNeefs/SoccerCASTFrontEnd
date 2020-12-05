import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  //hide menu on small screens
  collapsed: boolean = true;
  
  userLoaded: boolean = true;
  loggedIn: boolean = false;
  currentUser: User;

  userSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user: User) => {
      this.loggedIn = !!user;
      this.currentUser = user;
      this.userLoaded = true;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
