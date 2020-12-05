import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserLogin } from './models/user-login.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  userLogin: UserLogin;

  userLoginSub: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm) {
    const value = loginForm.value;
    this.userLogin = new UserLogin(value.email, value.password);

    this.userLoginSub = this.authService.login(this.userLogin).subscribe();
    loginForm.reset();
  }

  navigateSignUp() {
    this.router.navigate(['/signup']);
  }

  ngOnDestroy() {
    if (this.userLoginSub) {
      this.userLoginSub.unsubscribe();
    }
  }

}
