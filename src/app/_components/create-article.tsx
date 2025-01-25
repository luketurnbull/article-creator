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
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export default function CreateArticle() {
  const [isOpen, setIsOpen] = useState(false);

  const utils = api.useUtils();

  const { mutate, isPending } = api.article.create.useMutation({
    onSuccess: () => {
      void utils.article.getAll.invalidate();
      toast.success("Article created successfully");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Article
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl" aria-describedby="create-article">
        <DialogHeader>
          <DialogTitle>Create Article</DialogTitle>
          <DialogDescription>Create a new article.</DialogDescription>
        </DialogHeader>
        <ArticleForm onSubmit={mutate} />
      </DialogContent>
    </Dialog>
  );
}
