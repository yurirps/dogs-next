import type { Metadata } from "next";
import "./globals.css";
import { type_second } from "@/functions/fonts";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Dogs Next",
  description: "Rede social para pets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={type_second.variable} >
        <div className="app">
        <Header />
        <main className="appBody">
        {children}
        </main>
        <Footer />
        </div>
      </body>
    </html>
  );
}
