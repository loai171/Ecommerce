import express from "express";
import type { Request, Response, NextFunction } from "express";
import { errorHandler } from "./middlewares/error-handler.js";
import { apiRoutes } from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

// middleware for parsing json to body
app.use(express.json());

// middleware for parsing cookie
app.use(cookieParser());

// middleware for logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(req.method, ":", req.url);
  next();
});

// here is collect all routes
app.use("/api/v1", apiRoutes);

// middleware for error handling
app.use(errorHandler);

export default app;
