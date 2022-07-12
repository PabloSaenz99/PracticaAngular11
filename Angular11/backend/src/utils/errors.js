class GeneralError extends Error {
    constructor(message) {
        super();
        this.message = message? message: "Internal server error (Auto)";//Code (errorType) or custom message
    }    

    getDefaultMsg() {return this.message;}
    getCode() {return 500;}
}

class BadRequest extends GeneralError { 
    constructor() {super('Bad request (auto)');}
    getCode() {return 400;}
}
class NotFound extends GeneralError { 
    constructor() {super('Not found (auto)');}
    getCode() {return 404;} 
}

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