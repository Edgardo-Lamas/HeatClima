import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createContactMessage, getAllContactMessages } from "./db-contact";
import { notifyOwner } from "./_core/notification";

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

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "El nombre es requerido"),
          email: z.string().email("Email inválido"),
          phone: z.string().min(1, "El teléfono es requerido"),
          message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
        })
      )
      .mutation(async ({ input }) => {
        // Guardar en base de datos
        await createContactMessage({
          name: input.name,
          email: input.email,
          phone: input.phone,
          message: input.message,
          status: "new",
        });

        // Notificar al dueño
        await notifyOwner({
          title: `Nuevo mensaje de contacto: ${input.name}`,
          content: `**Email:** ${input.email}\n**Teléfono:** ${input.phone}\n\n**Mensaje:**\n${input.message}`,
        });

        return { success: true };
      }),
    list: publicProcedure.query(async () => {
      const messages = await getAllContactMessages();
      return messages;
    }),
  }),
});

export type AppRouter = typeof appRouter;
