import { Injectable } from "@angular/core";
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

    constructor(toast: ToastrService) {
        this.notification.subscribe(message => {
            switch(message.type){
                case NotificationType.success:
                    toast.success(message.message);
                    break;
                case NotificationType.error:
                    toast.error(message.message);
                    break;
                case NotificationType.warning:
                    toast.warning(message.message);
                    break;
                default:
                    toast.info(message.message);
            }
        })
    }
}