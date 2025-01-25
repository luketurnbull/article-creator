import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { calculateReadingTime } from "@/lib/utils";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const article = await api.article.getBySlug({ slug });

  if (!article) {
    notFound();
  }

  const readingTime = calculateReadingTime(article.content);
  const plural = readingTime > 1 ? "mins" : "min";

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">{article.title}</h1>
          <div className="mb-2 text-sm md:mb-8">
            {readingTime} {plural} read
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {article.user.avatar && (
                <Image
                  src={article.user.avatar}
                  alt={article.user.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <div className="flex flex-col">
                <span className="font-medium">{article.user.name}</span>
                <span className="text-sm text-muted-foreground">
                  {article.user.role}
                </span>
              </div>
            </div>

            <span className="text-sm text-muted-foreground">
              {new Date(article.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* Article Image */}
        {article.image && (
          <div className="mb-8">
            <Image
              src={article.image}
              alt={article.title}
              width={800}
              height={400}
              className="max-h-[400px] object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </main>
  );
}
