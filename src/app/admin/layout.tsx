export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="flex items-center justify-center bg-black p-4 text-white">
        <div className="container">
          <h1 className="text-2xl font-bold">Admin</h1>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
