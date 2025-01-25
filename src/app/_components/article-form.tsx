"use client";

import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type Content } from "@tiptap/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const isValidImagePath = (path: string) => {
  // Check if it's a valid URL
  try {
    new URL(path);
    return true;
  } catch {
    // Check if it's a valid local path format
    return /^\/[a-zA-Z0-9\-\_\/]+\.(jpg|jpeg|png|gif|webp)$/i.test(path);
  }
};

// Form validation schema
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(100, "Content must be at least 100 characters"),
  image: z
    .string()
    .min(1, "Image URL is required")
    .refine(
      (value) => isValidImagePath(value),
      "Please enter a valid image URL or path (e.g., https://example.com/image.jpg or /images/photo.png)",
    ),
  userId: z.number(),
});

type FormValues = z.infer<typeof formSchema>;

interface ArticleFormProps {
  defaultValues?: Partial<FormValues>;
  onSubmit: (values: FormValues) => void;
  isSubmitting?: boolean;
}

export default function ArticleForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: ArticleFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      content: defaultValues?.content ?? "",
      image: defaultValues?.image ?? "",
      userId: defaultValues?.userId ?? 1, // Default userId, adjust as needed
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Article title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Image URL..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <MinimalTiptapEditor
                  value={field.value as Content}
                  onChange={(newContent) => {
                    // If output is HTML, we need to handle it as a string
                    if (typeof newContent === "string") {
                      field.onChange(newContent);
                    }
                  }}
                  className="min-h-[200px] w-full rounded-md border border-input bg-background"
                  editorContentClassName="p-3"
                  output="html"
                  placeholder="Write your article content here..."
                  editorClassName="focus:outline-none"
                  immediatelyRender={false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Article"}
        </Button>
      </form>
    </Form>
  );
}
