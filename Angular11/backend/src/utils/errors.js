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
    FillAllFields: {CustomErrorCode: 0, msg: "You must fill all fields"},
    CannotGetData: {CustomErrorCode: 1, msg: "Error retrieving data"},
    CannotFindUser: {CustomErrorCode: 2, msg: "There is no user with that email"},
    CannotUpdateUser: {CustomErrorCode: 3, msg: "Cannot update user"},
    CannotDeleteUser: {CustomErrorCode: 4, msg: "Cannot delete user"},
    IncorrectPassword: {CustomErrorCode: 5, msg: "Incorrect password"},
    SelectUserAndTutorial: {CustomErrorCode: 6, msg: "You must select a user and a tutorial"},
    CannotFindTutorial: {CustomErrorCode: 7, msg: "There is no tutorial with that title"},
    CannotUpdateTutorial: {CustomErrorCode: 8, msg: "Cannot update tutorial"},
    CannotDeleteTutorial: {CustomErrorCode: 9, msg: "Cannot delete tutorial"},
}
  
module.exports = {
    GeneralError,
    BadRequest,
    NotFound,
    errorType
};