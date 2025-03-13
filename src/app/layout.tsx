import "./globals.css";
import { Inter } from "next/font/google";
import { TRPCProvider } from "@/components/providers/trpc-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
  description: "Simple Todo App with Next.js, tRPC, and Prisma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <TRPCProvider>
          <main className="container mx-auto px-4 py-8 max-w-2xl">
            {children}
          </main>
        </TRPCProvider>
      </body>
    </html>
  );
}
