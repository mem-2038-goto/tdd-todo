import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const todoRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.todo.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.todo.findUnique({
        where: { id: input.id },
      });
    }),

  create: publicProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.todo.create({
        data: { title: input.title },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        completed: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await ctx.prisma.todo.update({
        where: { id },
        data,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.todo.delete({
        where: { id: input.id },
      });
    }),
});
