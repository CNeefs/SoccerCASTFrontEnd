import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedIn: boolean = false

  userSub: Subscription;

  constructor(private router: Router, private _authService: AuthService) { }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  ngOnInit(): void {
    this.userSub = this._authService.user.subscribe((user: User) => {
      this.loggedIn = !!user;
    });
  }

  navigateLogin() {
    this.router.navigate(['/login'])
  }

  navigateSignUp() {
    this.router.navigate(['/signup'])
  }

}
