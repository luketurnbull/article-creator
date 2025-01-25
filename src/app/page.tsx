import { HydrateClient } from "@/trpc/server";
import { ArticleGrid } from "./_components/article-grid";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="min-h-screen">
        <ArticleGrid />
      </main>
    </HydrateClient>
  );
}
