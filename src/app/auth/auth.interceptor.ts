import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private _router: Router, private authService: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('in Interceptor');
        let userData: User = JSON.parse(localStorage.getItem("userData"));
        const helper = new JwtHelperService();
        if (userData) {
            //wanneer token lastig doet en in console _token staat ==> localstorage clearen (leegmaken) en terug opnieuw inloggen
            console.log(userData);
            const decodedToken = helper.decodeToken(userData.token);
            const expirationTime = decodedToken.exp * 1000;

            console.log(decodedToken);
            
            console.log(expirationTime);

            const currentDate = new Date();
            const currentDateTime = currentDate.getTime();

            console.log(currentDateTime);

            if(currentDateTime > expirationTime){
                this.authService.logout();
            }

            else{
                request = request.clone({
                    setHeaders: {
                        Authorization: 'Bearer ' + userData.token
                    }
                });
            }
        }
        return next.handle(request).pipe(
            catchError(err => {
                if (err.status === 401) {
                    this._router.navigate(['login']);
                }

                return throwError("unauthorized");
            }));
    }
}