import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const DEFAULT_USERS = [
  {
    name: "Luke",
    role: "Typescript Developer",
    avatar: "https://avatars.githubusercontent.com/u/6554880?v=4",
  },
  {
    name: "Broadsheet",
    role: "Company",
    avatar: "https://avatars.githubusercontent.com/u/194047283?v=4",
  },
];

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    // Get all users
    let allUsers = await ctx.db.query.users.findMany({
      orderBy: (users, { asc }) => [asc(users.name)],
    });

    // If no users exist, create the default users
    if (allUsers.length === 0) {
      await ctx.db.insert(users).values(DEFAULT_USERS);

      // Fetch the newly created users
      allUsers = await ctx.db.query.users.findMany({
        orderBy: (users, { asc }) => [asc(users.name)],
      });
    }

    return allUsers;
  }),
});
