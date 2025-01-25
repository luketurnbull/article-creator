"use client";

import { type RouterOutputs } from "@/trpc/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

function htmlToPlainText(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent ?? "";
}

export default function ArticleGrid({
  articles,
}: {
  articles: RouterOutputs["article"]["getAll"];
}) {
  const getPlainText = useMemo(() => {
    return (html: string) => {
      return htmlToPlainText(html);
    };
  }, []);

  if (!articles) return null;

  return (
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
              <h2 className="text-xl font-medium md:text-2xl">
                {article.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm font-normal md:text-base">
                {getPlainText(article.content)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
