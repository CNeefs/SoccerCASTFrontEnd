import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';

import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { Role } from '../models/role.model';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    baseUrl: string = "https://soccercastbackend.azurewebsites.net/api/";

    constructor(private http: HttpClient) {}

    getRoles() {
        return this.http.get<Role[]>(this.baseUrl + "Role");
    }

    getRoleByRoleId(roleID: number) {
        return this.http.get<Role>(this.baseUrl + "Role/" + roleID);
    }
}