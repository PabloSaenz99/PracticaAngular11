import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { NotificationMsg, NotificationType } from "../models/notification";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notification: Subject<NotificationMsg> = new Subject<NotificationMsg>();

    sendNotification(notification: NotificationMsg){
        this.notification.next(notification);
    }

    constructor(toast: ToastrService) {
        this.notification.subscribe(message => {
            switch(message.type){
                case NotificationType.success:
                    toast.success(message.message);
                    break;
                default:
                    toast.success(message.message);
            }
        })
    }
}