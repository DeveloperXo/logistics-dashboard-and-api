import express from "express";
import httpStatus from "http-status";
import cors from "cors";
import helmet from "helmet";
import expressWinston from "express-winston";
import winstonInstance from "config/winston";
import passport from "passport";
import jwtStrategy from "config/passport";
import mongoosePaginate from "mongoose-paginate-v2";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import { errorConverter, errorHandler } from "middlewares/error";
import routes from "routes";
import config from "config/config";
import sendResponse from "middlewares/sendResponse";
import ApiError from "utils/ApiError";
import {
  successHandler,
  errorHandler as morganErrorHandler,
} from "./config/morgan";

mongoosePaginate.paginate.options = {
  customLabels: { docs: "results", totalDocs: "totalResults" },
};

const app = express();

// production
if (config.env !== "test") {
  app.use(successHandler);
  app.use(morganErrorHandler);
}

// set security http headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse url-encoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// set api response
app.use(sendResponse);

// enable cors
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://192.168.123.249:3000",
      "http://localhost:4173",
      "https://dq7jqs-3000.csb.app",
    ],
    credentials: true,
  }),
);

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/v1", routes);
app.use("/static-public", express.static("public"));

// 404
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "http://localhost:3000, https://dq7jqs-3000.csb.app",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError if needed
app.use(errorConverter);

// error handler
app.use(errorHandler);
if (config.env === "development") {
  expressWinston.requestWhitelist.push("body");
  expressWinston.responseWhitelist.push("body");
  app.use(
    expressWinston.logger({
      winstonInstance,
      meta: true, // optional: log meta data about request (defaults to true)
      msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
      colorStatus: true, // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
    }),
  );
}

export default app;
