import { Injectable } from '@angular/core';
import { AuthGroup } from '../models/authorization.types';

@Injectable()
export class AuthorizationService {

    permissions: Array<string> = []; // Store the actions for which this user has permission

    constructor() { this.getPermissions(); }
    

    hasPermission(authGroup: AuthGroup) {
        if (this.permissions && this.permissions.find(permission => {
                return permission === authGroup;
            })) {
            return true;
        }
        return false;
    }

    getPermissions() {
    }

    // This method is called once and a list of permissions is stored in the permissions property
    initializePermissions() {
        //API Call
        return new Promise((resolve, reject) => {
            this.getPermissions();
        });
    }
}