export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Marketing Layout (full-width nav, no sidebar) */}
      <nav className="w-full border-b p-4">
        <div className="max-w-7xl mx-auto font-medium">Lindy Marketing Nav</div>
      </nav>
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
}
