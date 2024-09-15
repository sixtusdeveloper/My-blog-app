export const errorHandler = (statusCode, message) => {  
    const error = new Error();        
    error.statusCode = statusCode
    error.message = message 
    return error;
};   // error handler function to handle all errors