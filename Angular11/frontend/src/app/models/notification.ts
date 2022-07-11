import { environment } from "src/environments/environment";

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
/**
 * 
 * @param err Error msg (error.error)
 * @returns error string in the selected language in the env
 */
export function getErrorMessage(err: {customCode: number, message: string}): string{ 
    if(err.customCode === -1)   //If code is -1 its not a defined error, returns its message, else returns the custome code in the language
        return err.message;
    else if(environment.language === 'english')
        return Object.values(ErrorMessage)[err.customCode];
    else
        return "";
}

enum ErrorMessage {
    FillAllFields = "You must fill all fields",
    CannotGetData = "Error retrieving data",
    CannotFindUser = "There is no user with that email",
    CannotUpdateUser = "Cannot update user",
    CannotDeleteUser = "Cannot delete user",
    IncorrectPassword = "Incorrect password",
    SelectUserAndTutorial = "You must select a user and a tutorial",
    CannotFindTutorial = "There is no tutorial with that title",
    CannotUpdateTutorial = "Cannot update tutorial",
    CannotDeleteTutorial = "Cannot delete tutorial",
}