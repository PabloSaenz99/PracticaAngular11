import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService { 
    constructor(public jwtHelper: JwtHelperService, private userServ: UserService) {}

    public async getToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.userServ.isLoggedIn().subscribe(
            response => {                
                if(response === null)
                    resolve("");
                else
                    resolve(response);
            },
            error => {
                console.log(error);
                reject(error);
            })
        });
    }
    
    public async isAuthenticated(): Promise<boolean> {
        const token = await this.getToken();
        if (token !== "")
            return false;

        else
            return true;
    }

    public async getUserByMailToken(token: string): Promise<User>{
        var email = this.jwtHelper.decodeToken(token);
        return new Promise((resolve, reject) => {
            this.userServ.findByEmail(email.email).subscribe(
                response => {
                    if(response !== null)
                        resolve(response);
                    else 
                        reject(new Error("No user found"));

                },
                error => {
                    console.log(error);
                    reject(error);
                }
            );
        });
    }
}