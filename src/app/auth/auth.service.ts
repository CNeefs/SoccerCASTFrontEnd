import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { UserLogin } from './models/user-login.model';
import { AuthorizationService } from '../services/authorization.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../services/user.service';
import { ToastService } from '../toast/services/toast.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject(null);
    baseUrl: string = "https://localhost:44388/api/";

    constructor(private _authorizationService: AuthorizationService, private _userService: UserService, private http: HttpClient, private router: Router, private _toastService: ToastService) { }

    signup(newUser: User) {
        this.http.post<User>(this.baseUrl + "user", newUser).subscribe(userData => {
            this._toastService.show("Account has been created", {
                classname: 'bg-success text-light',
                delay: 3000,
                autohide: true
            });
            this.router.navigate(['/login']);
        }, error => {
            this._toastService.show("This email is already taken", {
                classname: 'bg-danger text-light',
                delay: 3000,
                autohide: true
            });
        });
    }

    login(userLogin: UserLogin) {
        this.http.post<User>(this.baseUrl + "user/authenticate", userLogin).subscribe(userData => {
            this.authenticationHandler(userData);
        });
    }

    autoLogin() {
        const userToken: string = JSON.parse(localStorage.getItem('userToken'));
        if (userToken) {
            //Exception Handler if token is not valid
            //if userToken exists => decode token and make user object (behaviorSubject)
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(userToken);
            var permissions = decodedToken.Permissions.split(';');
            permissions.pop();
            this._userService.getUserById(decodedToken.UserID).subscribe((user: User) => { 
                this.user.next(user);
            });
            this._authorizationService.initializePermissions(permissions);
        }
        return null;
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);
        this._authorizationService.initializePermissions(null);
    }

    private authenticationHandler(currentUser: User) {
        this._authorizationService.initializePermissions(currentUser.permissions);
        this.user.next(currentUser);
        localStorage.setItem("userToken", JSON.stringify(currentUser.token));
        this.router.navigate(['/home']);
    }
}