import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable, of, throwError} from 'rxjs';
import {mergeMap, delay, retryWhen} from 'rxjs/operators';
import { NotificationType } from "./models/notification";
import { NotificationService } from "./services/notification/notification.service";

@Injectable({
    providedIn: 'root'
})
export class interceptor implements HttpInterceptor{

    constructor(private notification: NotificationService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            retryWhen((error) => {
                return error.pipe(
                    mergeMap((error, index) => {
                        if (index < 2/*Number of attemps */ && error.status === 500) {
                            console.log(`Retry number: ${index}`);
                            return of(error).pipe(delay(10 /*Miliseconds until retry */));
                        }
                        else if(error.status === 400) {
                            this.notification.sendNotification(`Error 400: ${error.error.message}`, NotificationType.error);
                            console.log(`Error 400`);
                        }
                        else if(error.status === 404){
                            this.notification.sendNotification(`Error 404: ${error.error.message}`, NotificationType.error);
                            console.log(`Error 404`);
                        }
                        else {
                            this.notification.sendNotification(`Unknown error: ${error.error.message}`, NotificationType.error);
                            console.log(`Some error`);
                        }
                        throw error;
                    })
                )}
            )
        )
    }
}