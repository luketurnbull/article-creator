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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Article = RouterOutputs["article"]["getAll"][0];

interface ArticleTableProps {
  articles: Article[];
}

export default function ArticleTable({
  articles: initialArticles,
}: ArticleTableProps) {
  const utils = api.useUtils();
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);

  const { data: articles } = api.article.getAll.useQuery(undefined, {
    initialData: initialArticles,
  });

  const deleteArticle = api.article.delete.useMutation({
    onSuccess: () => {
      void utils.article.getAll.invalidate();
      setArticleToDelete(null);
    },
    onSettled: () => {
      setIsDeleting(null);
    },
  });

  const handleDelete = async (article: Article) => {
    setArticleToDelete(article);
  };

  const confirmDelete = async () => {
    if (!articleToDelete) return;
    setIsDeleting(articleToDelete.id);
    deleteArticle.mutate({ id: articleToDelete.id });
  };

  if (articles.length === 0) {
    return (
      <div className="mt-6 rounded-md border border-dashed p-8 text-center">
        <p className="text-muted-foreground">
          There are no articles. Click the &quot;New Article&quot; button to add
          a new article.
        </p>
      </div>
    );
  }

  return (
    <>
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
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(article)}
                    disabled={isDeleting === article.id}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="sr-only">Delete article</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={articleToDelete !== null}
        onOpenChange={(open) => !open && setArticleToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Article</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{articleToDelete?.title}
              &quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setArticleToDelete(null)}
              disabled={isDeleting !== null}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting !== null}
            >
              {isDeleting !== null ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
