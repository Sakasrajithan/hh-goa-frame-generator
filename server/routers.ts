import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createGeneratedImageShare } from "./shares";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  shares: router({
    create: publicProcedure.input(z.object({
      imageDataUrl: z.string().max(14_000_000),
      format: z.enum(["pfp", "id"]),
      builderName: z.string().max(128).optional(),
      builderHandle: z.string().max(128).optional(),
      builderTitle: z.string().max(128).optional(),
    })).mutation(async ({ input }) => createGeneratedImageShare(input)),
  }),
});

export type AppRouter = typeof appRouter;
