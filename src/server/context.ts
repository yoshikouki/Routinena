import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { auth } from './auth';
import { prisma } from "~/server/db";

export async function createContext(opts?: FetchCreateContextFnOptions) {
  const session = await auth();

  return {
    session,
    prisma,
    headers: opts && Object.fromEntries(opts.req.headers),
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
