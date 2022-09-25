import { StatusCodes } from "http-status-codes";
import express from "express";
const errorHandleMiddleware = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, //500
    message: err.message || "Something went wrong, try again later",
  };
  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST; //400
    defaultError.message = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(",");
  }

  res.status(defaultError.statusCode).json({ message: defaultError.message });
};

export default errorHandleMiddleware;
