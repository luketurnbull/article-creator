import { api } from "@/trpc/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";
import CreateArticle from "../_components/create-article";

export default async function AdminPage() {
  const articles = await api.article.getAll();

  return (
    <TooltipProvider>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
          <CreateArticle />
        </div>

        <div className="mt-6 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
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
      </div>
    </TooltipProvider>
  );
}
