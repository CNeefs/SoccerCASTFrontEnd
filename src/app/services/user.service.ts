import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';

import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService implements OnDestroy {

    baseUrl: string = "https://soccercastbackend.azurewebsites.net/api/";

    constructor(private http: HttpClient) {}

    upload(formData: FormData, id:number) {
        return this.http.post<{path:string}>(
          this.baseUrl + 'User/'+ id+ '/upload', formData
        );
      }

    getUsers() {
        return this.http.get<User[]>(this.baseUrl + "User");
    }

    getUserById(userID: number) {
        return this.http.get<User>(this.baseUrl + 'User/' + userID);
    }

    addUser(newUser: User) {
        return this.http.post<User>(this.baseUrl + "User", newUser, { reportProgress: true, observe: 'events' });
    }

    editUser(id: number, user: User) {
        return this.http.put<User>(this.baseUrl + "user/" + id, user);
    }

    deleteUserById(userID: number) {
        return this.http.delete<User>(this.baseUrl + 'user/' + userID);
    }

    ngOnDestroy(): void {

    }

}