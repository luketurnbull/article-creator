import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="flex items-center justify-center bg-black p-4 text-white">
        <div className="container flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin</h1>
          <Button variant="secondary">
            <Link href="/">Back to website</Link>
          </Button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
