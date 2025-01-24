# Broadsheet Task

Created using the [T3 Stack](https://create.t3.gg/)

## Tech used

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Shadcn/UI](https://ui.shadcn.com)

# Running the project

Start the database in Docker

```bash
./start-database.sh
```

Update the database schema

```bash
pnpm run db:push
```

Run the project

```bash
pnpm run dev
```

# TODO

- [x] Create T3 Stack project
- [x] Add Shadcn/UI
- [x] Deploy to Vercel
- [ ] Add Tiptap for rich text editing (use Lightweight [Shadcn minimal Tiptap](https://github.com/Aslam97/shadcn-minimal-tiptap))
