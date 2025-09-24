import ContaHeader from "@/components/conta/conta-header";

export default async function ContaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container">
      <ContaHeader />
      {children}
    </main>
  );
}
