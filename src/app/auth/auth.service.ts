import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserLogin } from './models/user-login.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject(null);
    baseUrl: string = "https://localhost:44388/api/";

    constructor(private http: HttpClient, private router: Router) { }

    signup(newUser: User) {
        console.log('new user: ' + newUser)
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
            console.log(decodedToken);
            const user: User = new User(
                decodedToken.UserID,
                decodedToken.FirstName,
                decodedToken.LastName,
                decodedToken.Email,
                null,
                userToken,
                decodedToken.BirthDay,
                decodedToken.TimesWon,
                decodedToken.TimesLost,
                decodedToken.RoleID,
                null
            );
            this.user.next(user);
        }
        return null;
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);
    }

    private authenticationHandler(currentUser: User) {
        const user = currentUser;
        this.user.next(user);
        localStorage.setItem("userToken", JSON.stringify(user.token));
        this.router.navigate(['/home']);
    }
}