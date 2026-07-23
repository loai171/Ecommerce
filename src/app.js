import express from "express";
import morgan from "morgan";

const app = express();

app.use((req,res,next)=>{
    console.log(req.method,":",req.url);
    next();
});

app.get("/", (req, res) => {
  res.send("Hello");
});

export default app;
