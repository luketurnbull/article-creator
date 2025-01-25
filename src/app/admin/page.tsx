import { api } from "@/trpc/server";

export default async function AdminPage() {
  const articles = await api.article.getAll();

  return (
    <div>
      <h1>Admin Page</h1>
      <pre>{JSON.stringify(articles, null, 2)}</pre>
    </div>
  );
}
