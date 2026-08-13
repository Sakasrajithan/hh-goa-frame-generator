import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Anonymous, durable references for finished canvas graphics. The file itself
 * is stored in S3; this table stores only display metadata and the storage key.
 */
export const generatedShares = mysqlTable("generatedShares", {
  id: varchar("id", { length: 32 }).primaryKey(),
  imageKey: varchar("imageKey", { length: 512 }).notNull(),
  imageUrl: varchar("imageUrl", { length: 1024 }).notNull(),
  format: mysqlEnum("format", ["pfp", "id"]).notNull(),
  builderName: varchar("builderName", { length: 128 }),
  builderHandle: varchar("builderHandle", { length: 128 }),
  builderTitle: varchar("builderTitle", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GeneratedShare = typeof generatedShares.$inferSelect;
export type InsertGeneratedShare = typeof generatedShares.$inferInsert;
