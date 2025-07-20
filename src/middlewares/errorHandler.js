import logger from "../logger.js";
import { ERROR_MAP } from "../utils/errorMap.js";

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  let statusCode = 500;
  let clientMessage = "Something went wrong";

  const errorKey = err.message;

  if (ERROR_MAP[errorKey]) {
    const mappedError = ERROR_MAP[errorKey];
    statusCode = mappedError.statusCode;
    clientMessage = mappedError.clientMessage;
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    clientMessage = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  } else if (err.name === "CastError") {
    statusCode = 400;
    clientMessage = `Invalid ${err.path}: ${err.value}`;
  } else if (err.code && err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    clientMessage = `Duplicate value for field: ${field}`;
  }

  res.status(statusCode).json({
    success: false,
    error: clientMessage,
  });
};

export default errorHandler;
