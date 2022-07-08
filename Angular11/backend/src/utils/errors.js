class GeneralError extends Error {
    constructor(message) {
        super();
        this.message = message? message : this.getDefaultMsg();
    }

    def = "(Auto) Internal server error";

    getDefaultMsg() {return this.def;}
    getCode() {return 500;}
}

class BadRequest extends GeneralError { def='Bad request'; getCode() {return 400;} }
class NotFound extends GeneralError { def='Not found'; getCode() {return 404;} }

const errorType = {
    FillAllFields: "You must fill all fields",
    CannotGetData: "Error retrieving data",
    CannotFindUser: "There is no user with that email",
    CannotUpdateUser: "Cannot update user",
    CannotDeleteUser: "Cannot delete user",
    IncorrectPassword: "Incorrect password",
    SelectUserAndTutorial: "You must select a user and a tutorial",
    CannotFindTutorial: "There is no tutorial with that title",
    CannotUpdateTutorial: "Cannot update tutorial",
    CannotDeleteTutorial: "Cannot delete tutorial",
    
}
  
module.exports = {
    GeneralError,
    BadRequest,
    NotFound,
    errorType
};