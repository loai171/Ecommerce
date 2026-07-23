import express, { Request, Response, NextFunction } from "express";

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, ":", req.url);
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

export default app;