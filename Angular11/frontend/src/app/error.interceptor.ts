import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { mergeMap, delay, retryWhen, tap } from 'rxjs/operators';
import { NotificationType } from "./models/notification";
import { NotificationService } from "./services/notification/notification.service";

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor{

    constructor(private notification: NotificationService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            //Success
            tap(event => {
                if(event instanceof HttpResponse){
                    /*
                    if(event.status >= 100 && event.status < 200) {           
                        this.notification.sendNotification(`${event.statusText}`, NotificationType.info);
                    }
                    else if(event.status >= 200 && event.status < 300){                      
                        this.notification.sendNotification(`Success`, NotificationType.success);
                    }*/
                }
            }),
            //Errors
            retryWhen((error) => {
                return error.pipe(
                    mergeMap((error, index) => {
                        if (error.status >= 500 && error.status < 600) {
                            if(index < 2 /*Number of attemps */) {
                                console.log(`Retry number: ${index}`);
                                return of(error).pipe(delay(10 /*Miliseconds until retry */));
                            }
                            else{
                                this.notification.sendNotification(`Error ${error.status}: ${error.error.message}`, NotificationType.error);
                            }
                        }
                        else if(error.status >= 400 && error.status < 500) {                       
                            this.notification.sendNotification(`Error ${error.status}: ${error.error.message}`, NotificationType.error);
                        }
                        else {
                            this.notification.sendNotification(`Error ${error.status}: ${error.error.message}`, NotificationType.warning);
                        }
                        console.log(`Error ${error.status}`);
                        throw error;
                    })
                )}
            )
        )
    }
}