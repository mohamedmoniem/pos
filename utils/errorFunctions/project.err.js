class proError extends Error {
    constructor (message , statusCode){
        super(message);
        this.statusCode= statusCode;
    }
}


module.exports=proError;