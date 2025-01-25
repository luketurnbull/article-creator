import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import { HydrateClient } from "@/trpc/server";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await api.article.getBySlug({
    slug: params.slug,
  });

  if (!article) {
    notFound();
  }

  return (
    <HydrateClient>
      <main className="container mx-auto px-4 py-8">
        <article className="prose lg:prose-xl mx-auto max-w-3xl">
          <h1>{article.title}</h1>
          <div className="flex items-center gap-2">
            <span>{article.user.name}</span>
            <span className="text-muted-foreground">
              {new Date(article.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div
            className="mt-8"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </main>
    </HydrateClient>
  );
}
