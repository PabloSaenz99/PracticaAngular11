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
  
module.exports = {
    GeneralError,
    BadRequest,
    NotFound
};