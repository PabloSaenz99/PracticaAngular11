import { Injectable, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { NotificationMsg, NotificationType } from "../../models/notification";

@Injectable({
    providedIn: 'root'
})

export class NotificationService {
    
    private notification: Subject<NotificationMsg> = new Subject<NotificationMsg>();

    sendNotification(message: string, type: NotificationType){
        this.notification.next(new NotificationMsg(message, type));
    }

    constructor(private toast: ToastrService) {
        this.notification.subscribe(message => {
            switch(message.type) {
                case NotificationType.success:
                    this.toast.success(message.message);
                    break;
                case NotificationType.error:
                    this.toast.error(message.message);
                    break;
                case NotificationType.warning:
                    this.toast.warning(message.message);
                    break;
                default:
                    this.toast.info(message.message);
            }
        })
    }
}