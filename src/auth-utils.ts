import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../prisma/db.setup";

export const encryptPassword = (password: string) => {
  return bcrypt.hash(password, 12);
};

export const createUnsecuredUserInfo = (user: User) => ({
  email: user.email,
});

export const createTokenForUser = (user: User) => {
  return jwt.sign(
    createUnsecuredUserInfo(user),
    process.env.JWT_SECRET as Secret
  );
};

const jwtInfoSchema = z.object({
  email: z.string().email(),
  iat: z.number(),
});

export const getDataFromAuthToken = (token?: string) => {
  if (!token) return null;
  try {
    return jwtInfoSchema.parse(
      jwt.verify(token, process.env.JWT_SECRET as Secret)
    );
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [, token] = req.headers.authorization?.split?.("") || [];
  const myJwtData = getDataFromAuthToken(token);
  if (!myJwtData) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const userFromJwt = await prisma.user.findFirst({
    where: {
      email: myJwtData.email,
    },
  });
  if (!userFromJwt) {
    return res.status(401).json({ message: "User Not found" });
  }

  (req as any).user = userFromJwt;
  next();
};
