# Broadsheet Task

Created using the [T3 Stack](https://create.t3.gg/)

## Tech used

- [Next.js](https://nextjs.org)
- [React](https://reactjs.org)
- [TypeScript](https://typescriptlang.org)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Shadcn/UI](https://ui.shadcn.com)
- [Tiptap](https://tiptap.dev)

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
- [x] Deploy to Vercelshadcn-minimal-tiptap) to add Tiptap for rich text editing
- [x] Add dependencies for Tiptap
- [x] Add shadcn/ui components for Tiptap
- [x] Create admin route for managing articles
- [x] Change tRPC routes to API routes to match the API routes in the designs
- [x] Create tRPC routes for CRUD operations on articles
- [x] Create Drizzle Schema for articles
- [x] Retrieve articles from the database and display them on the admin page
- [x] Create "new" button to open a modal for creating a new article
- [x] Follow the [Shadcn minimal Tiptap](https://github.com/Aslam97/
- [x] Use Shadcn form (react-hook-form) for creating a new article, make this a components so we can reuse it as edit form
- [ ] Use react-dropzone for uploading images?
- [ ] Bomb all t3 stack initial code
- [ ] Create articles page matching designs [Figma](<https://www.figma.com/design/PKspHMoAzVZ3GZLH6TVn3f/Fullstack-Developer-(Frontend)-Technical-Task?node-id=0-1&p=f&t=lMXAT3d2vsejAdoh-0>)
- [ ] Create article page matching designs [Figma](<https://www.figma.com/design/PKspHMoAzVZ3GZLH6TVn3f/Fullstack-Developer-(Frontend)-Technical-Task?node-id=0-1&p=f&t=lMXAT3d2vsejAdoh-0>)
- [ ] Add broadsheet user to GitHub repo for review (broadsheet-dev)

## Articles

- GET /api/articles - Retrieve the list of articles.
- GET /api/articles/:id - Retrieve a specific article by ID.
- POST /api/articles - Create a new article.
- PUT /api/articles/:id - Edit an existing article.
- DELETE /api/articles/:id - Delete an article.

### Schema

- Title
- Image - Store in DB as a Blob to avoid storage
- Content - HTML string
- Published By (User) - Should this be hardcoded to "Broadsheet" for now? Designs have an avatar, name and role. Probably need to create a user table.
- CreatedAt
- UpdatedAt

### tRPC Routes

- [ ] Create a new article
- [ ] Get all articles
- [ ] Get a single article
- [ ] Update an article
- [ ] Delete an article
