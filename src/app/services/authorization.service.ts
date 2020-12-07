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
        this.permissions.push('TABLE_MANAGE');
        this.permissions.push('TABLE_CREATE');
        this.permissions.push('TABLE_EDIT');
        this.permissions.push('TABLE_VIEW');
        this.permissions.push('USER_MANAGE');
        this.permissions.push('USER_CREATE');
        this.permissions.push('USER_EDIT');
        this.permissions.push('USER_VIEW');
        this.permissions.push('COMPETITION_MANAGE');
        this.permissions.push('COMPETITION_CREATE');
        this.permissions.push('COMPETITION_EDIT');
        this.permissions.push('COMPETITION_VIEW');
        this.permissions.push('TOURNAMENT_MANAGE');
        this.permissions.push('TOURNAMENT_CREATE');
        this.permissions.push('TOURNAMENT_EDIT');
        this.permissions.push('TOURNAMENT_VIEW');
    }

    // This method is called once and a list of permissions is stored in the permissions property
    initializePermissions() {
        //API Call
        return new Promise((resolve, reject) => {
            this.getPermissions();
        });
    }
}