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

Open Docker Desktop and run the following command to start the database:

```bash
./start-database.sh
```

Update the database schema:

```bash
pnpm run db:push
```

Run the project in development mode:

```bash
pnpm run dev
```

## Articles

Since I am using tRPC, I will not be using HTTP routes. I will be using tRPC routes:

- GET /api/articles - Retrieve the list of articles. - This will be /api/article.getAll
- GET /api/articles/:id - Retrieve a specific article by ID. - This will be /api/article.getById
- POST /api/articles - Create a new article. - This will be /api/article.create
- PUT /api/articles/:id - Edit an existing article. - This will be /api/article.update
- DELETE /api/articles/:id - Delete an article. - This will be /api/article.delete

### Schema

**Article**

- title - String
- image - String
- content - String
- createdAt - Date
- updatedAt - Date
- userId - Foreign key to user table

**User**

- name - String
- avatar - String (URL)
- role - String

## Implementation Details

### Server-Side Rendering (SSR)

The article view page (`/src/app/[slug]/page.tsx`) uses Server-Side Rendering. This means:

- The page is rendered on the server for each request
- Content is always fresh and up-to-date
- SEO friendly as search engines receive fully rendered HTML
- Better for dynamic, frequently updated content

Benefits of SSR for article pages:

- Always shows the latest version of the article
- Better for articles that might be updated frequently
- Improved SEO as content is generated server-side
- Handles dynamic data well (e.g., user comments in future)

### Incremental Static Regeneration (ISR)

The home page (`/src/app/page.tsx`) implements ISR with a 60-second revalidation period. This means:

- The page is statically generated at build time
- The page is served from cache for subsequent requests
- Every 60 seconds, the page can be regenerated in the background
- Users always see a static page (fast loading) with relatively fresh data

Benefits of ISR for the home page:

- Improved performance through static generation
- Reduced database load
- Fresh data through periodic revalidation
- Better SEO as content is available at build time

### Rendering Strategy Rationale

The application uses a hybrid approach to page rendering:

1. **Home Page (ISR)**: Since the articles list doesn't need real-time updates, ISR provides a good balance between performance and content freshness. The 60-second revalidation ensures users see relatively recent content while maintaining good performance.

2. **Article Pages (SSR)**: Individual article pages use SSR to ensure users always see the most up-to-date version of an article. This is important for:
   - Content accuracy
   - Real-time updates
   - Future features like comments or reactions
   - SEO optimization

This hybrid approach provides the best balance of performance and content freshness for different types of pages.

### tRPC Routes

- [x] Create a new article
- [x] Get all articles
- [x] Update an article
- [x] Delete an article
- [x] Get a single article

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
- [x] Add validation to the form
- [x] Add a delete button to the article table
- [x] Add edit button to the article table
- [x] Create edit article component - reuse the article form component
- [x] Add a dropdown to select the author of the article
- [x] Add Montserrat as default font
- [x] Bomb all t3 stack initial code

## Articles page [Figma](<https://www.figma.com/design/PKspHMoAzVZ3GZLH6TVn3f/Fullstack-Developer-(Frontend)-Technical-Task?node-id=0-1&p=f&t=lMXAT3d2vsejAdoh-0>)

- [x] Add shadcn/ui avatar component

## Article page [Figma](<https://www.figma.com/design/PKspHMoAzVZ3GZLH6TVn3f/Fullstack-Developer-(Frontend)-Technical-Task?node-id=0-1&p=f&t=lMXAT3d2vsejAdoh-0>)

- [x] Create route using slugs
- [x] Added styling to the article page
- [x] Incremental Static Regeneration (ISR) for the Home Page
- [x] Server-Side Rendering (SSR) for the Article View Page
- [x] Minutes read logic
- [ ] Add a seed script to populate the database with several users and articles
- [ ] Documentation - Steps to set up the application.
- [ ] Documentation - How to run the application locally.
- [x] Documentation - Explanation of where SSR and ISR are implemented and why.
- [ ] API documentation.
- [ ] Add broadsheet user to GitHub repo for review (broadsheet-dev)
- [ ] Email Broadsheet for review

## Would be nice

- [ ] Refine SEO
- [ ] Design has "Load More" - Add lazy loading to the articles page?
- [ ] Add favicon
- [ ] Create a 404 "not found" page
