import { api } from "@/trpc/server";
import ArticleGrid from "./_components/article-grid";

export const revalidate = 60;

export default async function Home() {
  const articles = await api.article.getAll();

  return (
    <main className="min-h-screen">
      <ArticleGrid articles={articles} />
    </main>
  );
}
