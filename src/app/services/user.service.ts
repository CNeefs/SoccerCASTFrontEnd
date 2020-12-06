import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService implements OnDestroy {

    baseUrl: string = "https://localhost:44388/api/";

    constructor(private http: HttpClient) {}

    getUsers() {
        return this.http.get<User[]>(this.baseUrl + "User");
    }

    getUserById(userID: number) {
        return this.http.get<User>(this.baseUrl + 'User/' + userID);
    }

    ngOnDestroy(): void {

    }

}