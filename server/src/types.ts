import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Response, Request } from "express";
import { Session } from "express-session";
import { Redis } from "ioredis";

declare module "express-session" {
  export interface SessionData {
    userId: number | undefined;
  }
}

export type MyContext = {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: Session };
  redis: Redis;
  //   req: Request;
  //   req: Request & { session: Express.Session };
  res: Response;
};
