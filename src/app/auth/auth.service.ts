import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';
import { UserLogin } from './models/user-login.model';
import { UserSignup } from './models/user-signup.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject(null);

    constructor(private http: HttpClient, private router: Router) { }

    signup(newUser: UserSignup) {
        console.log('new user: ' + newUser)
        return this.http.post<User>("https://localhost:44388/api/User", newUser)
            .pipe(tap(userData => {
                this.authenticationHandler(
                    userData.userID,
                    userData.firstName,
                    userData.lastName,
                    userData.email,
                    userData.password,
                    userData.token,
                    userData.birthDate,
                    userData.timesWon,
                    userData.timesLost,
                    userData.roleID,
                    userData.role
                );
            }));
    }

    login(userLogin: UserLogin): Observable<User> {
        return this.http.post<User>("https://localhost:44388/api/User/authenticate", userLogin).pipe(tap(userData => {
            this.authenticationHandler(
                userData.userID,
                userData.firstName,
                userData.lastName,
                userData.email,
                userData.password,
                userData.token,
                userData.birthDate,
                userData.timesWon,
                userData.timesLost,
                userData.roleID,
                userData.role
            )
        }));
    }

    autoLogin() {
        const userToken: string = JSON.parse(localStorage.getItem('userToken'));
        
        if (!userToken) {
            return;
        }

        if (userToken) {
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
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);
    }

    private authenticationHandler(userId: number, firstName: string, lastName: string, email: string, password: string, token: string, birthDate: Date, timesWon: number, timesLost: number, roleID: number, role: Role) {
        const user = new User(
            userId,
            firstName,
            lastName,
            email,
            password,
            token,
            birthDate,
            timesWon,
            timesLost,
            roleID,
            role
        )
        this.user.next(user);
        localStorage.setItem("userToken", JSON.stringify(user.token));
        this.router.navigate(['/home']);
    }
}