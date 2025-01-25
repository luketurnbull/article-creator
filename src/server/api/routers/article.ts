import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { articles } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { generateSlug } from "@/lib/utils";

// Input validation schema for creating/updating articles
const articleSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  image: z.string().min(1),
  userId: z.number(),
});

export const articleRouter = createTRPCRouter({
  // Get all articles
  getAll: publicProcedure.query(async ({ ctx }) => {
    // Temporarily remove the user relation until schema is properly set up
    const allArticles = await ctx.db.query.articles.findMany({
      orderBy: (articles, { desc }) => [desc(articles.createdAt)],
      with: {
        user: true,
      },
    });
    return allArticles;
  }),

  // Get single article by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const article = await ctx.db.query.articles.findFirst({
        where: eq(articles.id, input.id),
        with: {
          user: true,
        },
      });
      return article;
    }),

  // Get article by slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const article = await ctx.db.query.articles.findFirst({
        where: eq(articles.slug, input.slug),
        with: {
          user: true,
        },
      });
      return article;
    }),

  // Create new article
  create: publicProcedure
    .input(articleSchema)
    .mutation(async ({ ctx, input }) => {
      const slug = generateSlug(input.title);
      const article = await ctx.db.insert(articles).values({
        title: input.title,
        slug,
        content: input.content,
        image: input.image,
        userId: input.userId,
      });
      return article;
    }),

  // Update article
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: articleSchema.partial(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const data = { ...input.data };
      if (data.title) {
        data.slug = generateSlug(data.title);
      }
      const article = await ctx.db
        .update(articles)
        .set(data)
        .where(eq(articles.id, input.id));
      return article;
    }),

  // Delete article
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(articles).where(eq(articles.id, input.id));
      return { success: true };
    }),
});
