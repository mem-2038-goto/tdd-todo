import { initTRPC } from "@trpc/server";
import { prisma } from "./db";

interface ContextOptions {
  req?: Request;
}

export const createContext = async ({ req }: ContextOptions = {}) => {
  return {
    prisma,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
