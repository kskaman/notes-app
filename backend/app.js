const config = require("./utils/config");
const express = require("express");
const mongoose = require("mongoose");

// A mechanism that allows controlled access
// to resources located outside of a given domain.
// By default, browsers block requests to your
// API if they come from a different domain
// or port; enabling CORS with specific rules(e.g.,
// allowed origins) lets you specify where requests can come from.
// This is particularly important if you’re
// serving the frontend from a different domain than your backend API.
const cors = require("cors");

// Helmet is a collection of security middlewares for Express.
// It sets various HTTP headers to help protect your app from
// some well - known web vulnerabilities(e.g., clickjacking, XSS attacks).
// It automatically configures headers like X-Frame-Options,
// Strict - Transport - Security, and others.
const helmet = require("helmet");

// This middleware helps prevent denial-of-service
// attacks or brute - force attacks by limiting
// the number of requests a single IP can make
// within a specific time window.
// You can customize the window size (windowMs)
// and the maximum number of allowed requests(max).
// It’s essential for rate-limiting sensitive
// endpoints(e.g., login routes) to reduce abuse.
const rateLimit = require("express-rate-limit");

const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");

const app = express();

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB : ", error.message);
  });

// Middleware
app.use(helmet);
app.use(cors());
//    app.use(express.static('dist'))
app.use(express.json());
app.use(middleware.requestLogger);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

// Unknown endpoint and error handling
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
