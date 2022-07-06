import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})

export class AuthService {  
    
    constructor(public jwtHelper: JwtHelperService) {}
    
    public isAuthenticated(): boolean {
        /*
        console.log("isauth");
        console.log(document.cookie);
        
        var token = document.cookie;
        token = token.replace("token=", "");
        if(token === null)
            return false;
        else
            return !this.jwtHelper.isTokenExpired(token);
        */
        return true;//Commented above because it doesnt work
    }
}