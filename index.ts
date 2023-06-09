import express, { Application, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

import user from "./Routes/userRoute";
import question from "./Routes/testRoute";

const app: Application = express();
const port: number = 2255;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", user);
app.use("/api/test", question);

app.use("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome" });
});

mongoose
  .connect(
    "mongodb+srv://shecodesaj:shecodesaj@cluster0.xe1jgnf.mongodb.net/newIntakeDB",
  )
  .then(() => {
    const server = app.listen(process.env.PORT || port, () => {
      console.log("server up and running!");
    });

    process.on("uncaughtException", (err: Error) => {
      console.log("shuttin down server bcos: uncaughtException");
      console.log(err);
      process.exit(1);
    });

    process.on("unhandledRejection", (reason: any) => {
      console.log("shuttin down server bcos: unhandledRejection");
      console.log(reason);
      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
