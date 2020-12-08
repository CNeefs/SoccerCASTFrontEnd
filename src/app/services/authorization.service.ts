import { Injectable } from '@angular/core';
import { AuthGroup } from '../models/authorization.types';

@Injectable()
export class AuthorizationService {

    permissions: Array<string> = []; // Store the actions for which this user has permission

    constructor() { }
    

    hasPermission(authGroup: AuthGroup) {
        if (this.permissions && this.permissions.find(permission => {
                return permission === authGroup;
            })) {
            return true;
        }
        return false;
    }

    // This method is called once and a list of permissions is stored in the permissions property
    initializePermissions(userPermissions: Array<string>) {
        if (userPermissions != null) {
            userPermissions.forEach(permission => {
                this.permissions.push(permission);
            });
        } else this.permissions = [];
    }
}