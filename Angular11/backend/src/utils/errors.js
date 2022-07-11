class GeneralError extends Error {
    constructor(message) {
        super();
        this.message = message? message: this.getDefaultMsg();//Code (errorType) or custom message
    }

    def = "(Auto) Internal server error";

    getDefaultMsg() {return this.def;}
    getCode() {return 500;}
}

class BadRequest extends GeneralError { def='Bad request (auto)'; getCode() {return 400;} }
class NotFound extends GeneralError { def='Not found (auto)'; getCode() {return 404;} }

const errorType = {
    FillAllFields: '0',
    CannotGetData: '1',
    CannotFindUser: '2',
    CannotUpdateUser: '3',
    CannotDeleteUser: '4',
    IncorrectPassword: '5',
    SelectUserAndTutorial: '6',
    CannotFindTutorial: '7',
    CannotUpdateTutorial: '8',
    CannotDeleteTutorial: '9'
}

module.exports = {
    GeneralError,
    BadRequest,
    NotFound,
    errorType
};