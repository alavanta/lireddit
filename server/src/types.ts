import { Request, Response } from "express";
import { Session } from "express-session";
import { Redis } from "ioredis";

declare module "express-session" {
  export interface SessionData {
    userId: number | undefined;
  }
}

export type MyContext = {
  req: Request & { session: Session };
  redis: Redis;
  res: Response;
};
