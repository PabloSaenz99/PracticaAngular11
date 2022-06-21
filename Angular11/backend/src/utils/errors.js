class GeneralError extends Error {
    constructor(message) {
      super();
      this.message = message? message : this.getDefaultMsg();
    }

    def = "Internal server error";

    getDefaultMsg() {
        return this.def;
    }

    getCode() {
      return 500;
    }
  }
  
  class BadRequest extends GeneralError { def='400'; getCode(){return 400;}}
  class NotFound extends GeneralError { def="404"; getCode() {return 404;} }
  
  module.exports = {
    GeneralError,
    BadRequest,
    NotFound
  };