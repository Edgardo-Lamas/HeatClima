import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { getDb } from "./db";
import { contactMessages } from "../drizzle/schema";
import { eq } from "drizzle-orm";

function createTestContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  beforeEach(async () => {
    // Limpiar mensajes de prueba antes de cada test
    const db = await getDb();
    if (db) {
      await db.delete(contactMessages).where(eq(contactMessages.email, "test@example.com"));
    }
  });

  it("guarda un mensaje de contacto válido en la base de datos", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const testData = {
      name: "Juan Pérez Test",
      email: "test@example.com",
      phone: "11 1234 5678",
      message: "Este es un mensaje de prueba para verificar la funcionalidad del formulario de contacto.",
    };

    const result = await caller.contact.submit(testData);

    expect(result).toEqual({ success: true });

    // Verificar que se guardó en la base de datos
    const db = await getDb();
    if (db) {
      const savedMessages = await db
        .select()
        .from(contactMessages)
        .where(eq(contactMessages.email, testData.email));

      expect(savedMessages).toHaveLength(1);
      expect(savedMessages[0]?.name).toBe(testData.name);
      expect(savedMessages[0]?.email).toBe(testData.email);
      expect(savedMessages[0]?.phone).toBe(testData.phone);
      expect(savedMessages[0]?.message).toBe(testData.message);
      expect(savedMessages[0]?.status).toBe("new");
    }
  });

  it("rechaza un mensaje con email inválido", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const invalidData = {
      name: "Juan Pérez",
      email: "email-invalido",
      phone: "11 1234 5678",
      message: "Mensaje de prueba",
    };

    await expect(caller.contact.submit(invalidData)).rejects.toThrow();
  });

  it("rechaza un mensaje con texto muy corto", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const invalidData = {
      name: "Juan Pérez",
      email: "test@example.com",
      phone: "11 1234 5678",
      message: "Corto",
    };

    await expect(caller.contact.submit(invalidData)).rejects.toThrow();
  });
});
