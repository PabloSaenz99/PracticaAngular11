import { Injectable } from "@angular/core";
import { CanActivate,Router } from "@angular/router";
import { NotificationType } from "src/app/models/notification";
import { NotificationService } from "../notification/notification.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

	constructor(public auth: AuthService, public router: Router, private notificationService: NotificationService) {}

	canActivate(): boolean {
		var isAuthenticated = this.auth.isAuthenticated();
		if (!isAuthenticated) {
			this.router.navigate(['/login']);
			this.notificationService.sendNotification("You need to be logged in!", NotificationType.warning);
		}
		return isAuthenticated;
	}
}
