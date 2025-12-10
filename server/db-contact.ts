import { contactMessages, InsertContactMessage } from "../drizzle/schema";
import { getDb } from "./db";

/**
 * Guarda un nuevo mensaje de contacto en la base de datos
 */
export async function createContactMessage(data: InsertContactMessage) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(contactMessages).values(data);
  return result;
}

/**
 * Obtiene todos los mensajes de contacto ordenados por fecha (más recientes primero)
 */
export async function getAllContactMessages() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const messages = await db
    .select()
    .from(contactMessages)
    .orderBy(contactMessages.createdAt);
  
  return messages;
}
