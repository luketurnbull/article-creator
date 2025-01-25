"use client";

import { api } from "@/trpc/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type RouterOutputs } from "@/trpc/react";
import Image from "next/image";

type Article = RouterOutputs["article"]["getAll"][0];

interface ArticleTableProps {
  articles: Article[];
}

export default function ArticleTable({
  articles: initialArticles,
}: ArticleTableProps) {
  const { data: articles } = api.article.getAll.useQuery(undefined, {
    initialData: initialArticles,
  });

  return (
    <div className="mt-6 rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell>
                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                  {article.image && (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  )}
                </div>
              </TableCell>
              <TableCell className="font-medium">{article.title}</TableCell>
              <TableCell>{article.user.name}</TableCell>
              <TableCell>
                {new Date(article.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {/* We'll add edit/delete buttons here later */}
                Actions
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
