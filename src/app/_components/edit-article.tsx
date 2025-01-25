"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ArticleForm from "./article-form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { type RouterOutputs } from "@/trpc/shared";

type Article = RouterOutputs["article"]["getAll"][0];

export default function EditArticle({ article }: { article: Article }) {
  const [isOpen, setIsOpen] = useState(false);

  const utils = api.useUtils();

  const { mutate, isPending } = api.article.update.useMutation({
    onSuccess: () => {
      void utils.article.getAll.invalidate();
      toast.success("Article updated successfully");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil />
          <span className="sr-only">Edit article</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-h-[90vh] max-w-3xl overflow-y-auto"
        aria-describedby="edit-article"
      >
        <DialogHeader>
          <DialogTitle>Edit Article</DialogTitle>
          <DialogDescription>Edit an article.</DialogDescription>
        </DialogHeader>
        <ArticleForm
          defaultValues={article}
          onSubmit={(values) => mutate({ id: article.id, data: values })}
          isSubmitting={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
