import express from "express";
import { dogController } from "./router/dog.router";
import { userController } from "./router/user.router";
import "express-async-errors";
import { authController } from "./router/auth.router";
import { User } from "@prisma/client";
import { error } from "console";

const app = express();

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }

  namespace NodeJS {
    export interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }
}

["DATABASE_URL", "JWT_SECRET"].forEach((key) => {
  if (process.env[key] === undefined) {
    throw new Error(`Missing environment variable ${key}`);
  }
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(authController);
app.use(dogController);
app.use(userController);

app.listen(3000);
