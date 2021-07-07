class APIError extends Error {
    constructor(error){
        super(error)
        this.name = 'APIError';
        this.message = error;
    }
}

module.exports = APIError;