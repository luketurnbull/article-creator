import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ") // Replace HTML tags with spaces
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .replace(/&nbsp;/g, " ") // Replace &nbsp; with spaces
    .replace(/&amp;/g, "&") // Replace &amp; with &
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&lt;/g, "<") // Replace &lt; with <
    .replace(/&gt;/g, ">") // Replace &gt; with >
    .trim(); // Remove leading/trailing whitespace
}

export function calculateReadingTime(
  content: string,
  wordsPerMinute = 200,
): number {
  // Remove HTML tags and trim whitespace
  const plainText = content.replace(/<[^>]*>/g, "");

  // Count words (split by whitespace)
  const wordCount = plainText.trim().split(/\s+/).length;

  // Calculate reading time in minutes
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  // Return at least 1 minute
  return Math.max(1, readingTime);
}
