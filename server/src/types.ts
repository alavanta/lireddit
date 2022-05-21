import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Response, Request } from "express";
import { Session } from "express-session";

declare module "express-session" {
  export interface SessionData {
    userId: number | undefined;
  }
}

export type MyContext = {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: Session };
  //   req: Request;
  //   req: Request & { session: Express.Session };
  res: Response;
};
