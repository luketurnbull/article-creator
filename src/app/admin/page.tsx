import { api } from "@/trpc/server";
import { TooltipProvider } from "@/components/ui/tooltip";
import CreateArticle from "../_components/create-article";
import { HydrateClient } from "@/trpc/server";
import ArticleTable from "../_components/article-table";

export default async function AdminPage() {
  const articles = await api.article.getAll();

  return (
    <TooltipProvider>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
          <CreateArticle />
        </div>

        <HydrateClient>
          <ArticleTable articles={articles} />
        </HydrateClient>
      </div>
    </TooltipProvider>
  );
}
