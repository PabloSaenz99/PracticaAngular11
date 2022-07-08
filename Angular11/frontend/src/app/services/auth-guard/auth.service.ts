import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthService { 
    baseUrl = environment.url + environment.port + '/api/auth'; //'http://localhost:3000/api/tutorials'

    constructor(public jwtHelper: JwtHelperService, private http: HttpClient) {}

    isLoggedIn(): Observable<string> {
        return this.http.get<string>(`${this.baseUrl}/login`);
    }
    
    public async isAuthenticated(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.isLoggedIn().subscribe(
            response => {                
                if(response === null)
                    resolve(false);
                else
                    resolve(!this.jwtHelper.isTokenExpired(response));
            },
            error => {
              console.log(error);
              reject(error);
            })
        });
    }
}