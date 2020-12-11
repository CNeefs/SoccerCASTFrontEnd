import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserLogin } from './models/user-login.model';
import { AuthorizationService } from '../services/authorization.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject(null);
    baseUrl: string = "https://localhost:44388/api/";

    constructor(private _authorizationService: AuthorizationService, private _userService: UserService, private http: HttpClient, private router: Router) { }

    signup(newUser: User) {
        //console.log('new user: ' + newUser)
        return this.http.post<User>(this.baseUrl + "user", newUser)
            .pipe(tap(userData => {
                this.authenticationHandler(userData);
            }));
    }

    login(userLogin: UserLogin): Observable<User> {
        return this.http.post<User>(this.baseUrl + "user/authenticate", userLogin)
            .pipe(tap(userData => {
                this.authenticationHandler(userData)
            }));
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
        const user = currentUser;
        this._authorizationService.initializePermissions(user.permissions);
        this.user.next(user);
        localStorage.setItem("userToken", JSON.stringify(user.token));
        this.router.navigate(['/home']);
    }
}