import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';
import { UserLogin } from './models/user-login.model';

@Injectable({ providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject(null);

    constructor(private http: HttpClient, private router: Router) {}

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

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/login']);
    }

    private authenticationHandler(userId: number, firstName: string, lastName: string, email: string, password: string, token: string, birthDate: Date, timesWon: number, timesLost: number, roleID: number, role: Role){
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
        localStorage.setItem("userData", JSON.stringify(user));
        this.router.navigate(['/home']);
    }
}