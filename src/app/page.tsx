import { api } from "@/trpc/server";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { stripHtml } from "@/lib/utils";

export const revalidate = 60;
export const dynamic = "force-static";

export default async function Home() {
  const articles = await api.article.getAll();

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center md:mb-16">
          <h1 className="mb-2 text-2xl font-bold md:text-4xl">
            Exploring New Articles
          </h1>
          <p className="text-sm md:text-2xl">
            Ideas, trends, and inspiration for a brighter future
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              href={`/${article.slug}`}
              key={article.id}
              className="group flex flex-col gap-4"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={article.user.avatar ?? ""} />
                  <AvatarFallback>
                    {article.user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{article.user.name}</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(article.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-medium group-hover:underline md:text-2xl">
                  {article.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm font-normal md:text-base">
                  {stripHtml(article.content)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
