export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="flex items-center justify-between bg-black p-4 text-white">
        <h1 className="text-2xl font-bold">Admin</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
