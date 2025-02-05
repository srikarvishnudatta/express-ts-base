import { boolean, integer, pgEnum, pgTable,timestamp,varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { sql } from "drizzle-orm";

export const statusEnum = pgEnum("status_type", [
    "invited",
    "accepted",
    "rejected",
    "expired"
]);

export const groupTable = pgTable("groups", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  group_name: varchar({length: 255}).notNull(),
    owner: integer().notNull().references(() => usersTable.id),
    members: integer().array().notNull().default(sql`'{}'::integer[]`),
    created_at: timestamp().defaultNow().notNull()
});

export const groupMembershipsTable = pgTable("group_memberships", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    group_id: integer().notNull().references(() => groupTable.id),
    user_id: integer().notNull().references(() => usersTable.id),
    is_owner: boolean().default(false).notNull(),
  });

export const groupInvitationsTable = pgTable("group_invitations", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    group_id: integer().notNull().references(() => groupTable.id),
    sender_id: integer().notNull().references(() => usersTable.id),
    receiver_id: integer().notNull().references(() => usersTable.id),
    status: statusEnum(),
    created_at: timestamp().defaultNow().notNull(),
    expires_at: timestamp().notNull()
})

export type InsertGroupTable = typeof groupTable.$inferInsert;


export type InsertInvitationType = typeof groupInvitationsTable.$inferInsert;

export type InsertMembershipType = typeof groupMembershipsTable.$inferInsert;