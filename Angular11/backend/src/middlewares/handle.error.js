const { GeneralError, errorType } = require('../utils/errors');

const handleErrors = (err, req, res, next) => {
    console.log("Handle error");
    console.log(err);
    if (err instanceof GeneralError) {
        if(Object.keys(errorType)[err.message])     //If is a known error code (err message), returns its code and default message
            return res.status(err.getCode()).json({
                customCode: err.message,
                message: 'error: ' + Object.keys(errorType)[err.message]
            });
        else
            return res.status(err.getCode()).json({ //Else returns -1 and its custom message
                customCode: -1,
                message: 'error: ' + err.message
            });
    }

    return res.status(500).json({
        status: 'error',
        message: err.message
    }); 
}

module.exports = handleErrors;