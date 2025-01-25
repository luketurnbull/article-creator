import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const createTable = pgTableCreator((name) => `broadsheet-task_${name}`);

export const users = createTable(
  "user",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    role: varchar("role", { length: 256 }).notNull(),
    avatar: varchar("avatar", { length: 1000 }), // URL to avatar
  },
  (user) => ({
    nameIndex: index("user_name_idx").on(user.name),
  }),
);

export const articles = createTable(
  "article",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    title: varchar("title", { length: 256 }).notNull(),
    slug: varchar("slug", { length: 256 }).notNull().unique(),
    content: varchar("content", { length: 10000 }).notNull(), // HTML content
    image: text("image").notNull(), // Base64 encoded image blob
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (article) => ({
    titleIndex: index("title_idx").on(article.title),
    slugIndex: index("slug_idx").on(article.slug),
  }),
);

// Define relations for users
export const usersRelations = relations(users, ({ many }) => ({
  articles: many(articles),
}));

// Define relations for articles
export const articlesRelations = relations(articles, ({ one }) => ({
  user: one(users, {
    fields: [articles.userId],
    references: [users.id],
  }),
}));
