import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserLogin } from './models/user-login.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss', '../styles/validation_style.scss']
})
export class AuthComponent implements OnInit {
  userLogin: UserLogin;

  userSub: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user: User) => { 
      if (user) {
        this.router.navigate(['/home']);
        if (this.userSub) this.userSub.unsubscribe();
      }
    });
  }

  onSubmit(loginForm: NgForm) {
    const value = loginForm.value;
    this.userLogin = new UserLogin(value.email, value.password);

    this.authService.login(this.userLogin);
    loginForm.reset();
  }

  navigateSignUp() {
    this.router.navigate(['/signup']);
  }
}
