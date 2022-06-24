export class NotificationMsg {
    message: string;
    type: NotificationType;

    constructor(message: string, type: NotificationType) {
        this.message = message;
        this.type = type;
    }
}

export enum NotificationType{
    success = 0,
    warning = 1,
    error = 2,
    info = 3
}