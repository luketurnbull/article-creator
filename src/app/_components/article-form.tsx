"use client";

import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { type Content } from "@tiptap/react";
import { useState } from "react";

export default function ArticleForm() {
  const [value, setValue] = useState<Content | null>(null);

  return (
    <MinimalTiptapEditor
      value={value}
      onChange={setValue}
      className="w-full"
      editorContentClassName="p-5"
      output="html"
      placeholder="Type your content here..."
      autofocus={true}
      editable={true}
      editorClassName="focus:outline-none"
    />
  );
}
