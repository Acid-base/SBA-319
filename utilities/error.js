class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = this.constructor.name; // For better identification of error types
  }
}
  
module.exports = {
  ApiError, 
  error: (status, msg) => new ApiError(status, msg) 
};
  