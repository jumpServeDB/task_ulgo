import cors from "cors";
import "dotenv/config";
import type { NextFunction, Request, Response } from "express";
import express from "express";
import mongoose from "mongoose";
import taskRoute from "../src/routes/taskRoute.js";
import userRoute from "../src/routes/userRoute.js";

const app = express();
app.use(cors());
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000
app.use(express.json());

// log incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.method, req.url);
    if (req.body) {
        console.log("body:", req.body);
    } else {
        console.log("No request body.");
    }
    next();
})

// routes

app.use("/api/user", userRoute);
app.use("/api/tasks", taskRoute)

// connect to DB

const mongoURI = process.env.MONGO_URI ?? "";
mongoose
.connect(mongoURI)
.then(() => {
    app.listen(PORT, () => {
        console.log("connected to db, listening on port ", PORT);
    });
})
.catch((error: unknown) => {
    console.error("DB connection erro:", error);
});