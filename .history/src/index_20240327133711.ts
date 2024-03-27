// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./services/database.service";
import { adRouter } from "./routes/ad.router";
import { groupRouter } from "./routes/group.router";
import { paymentRouter } from "./routes/payment.router";
import { relationalRouter } from "./routes/ralational.router";
import { userRouter } from "./routes/users.router";
import { winRouter } from "./routes/win.router";
import { attemptRouter } from "./routes/attempt.router";
import { magician } from "./routes/magician.router";
import { freeBurnsRouter } from "./routes/freeBurns.router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Connessione al database MongoDB
connectToDatabase()
  .then(() => {
    app.use("/users", userRouter);
    app.use("/group", groupRouter);
    app.use("/ad", adRouter);
    app.use("/payment", paymentRouter);
    app.use("/win", winRouter);
    app.use("/attempt", attemptRouter);
    app.use("/freeBurns", freeBurnsRouter);
    app.use("/relational", relationalRouter);
    app.use("/magician", magician);

    // Definisci le route dopo aver stabilito la connessione al database
    app.get("/", (req: Request, res: Response) => {
      res.send("Express + TypeScript Server");
    });

    // Avvia il server
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error: any) => {
    // Gestisci eventuali errori di connessione al database
    console.error("Failed to connect to database:", error);
  });
