import { Injectable } from "@angular/core";
import { CanActivate,Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

	constructor(public auth: AuthService, public router: Router) {}

	canActivate(): boolean {
		var isAuthenticated = this.auth.isAuthenticated();
		if (!isAuthenticated) {
			this.router.navigate(['/login']);
		}
		return isAuthenticated;
	}
}
