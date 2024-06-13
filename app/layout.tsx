import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
<<<<<<< HEAD
import { Toaster } from "@/components/ui/sonner";
=======
>>>>>>> 9c41f12f419b04f98443bb68f6dea5672469a670

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AUTH",
  description: "AUTH",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
<<<<<<< HEAD
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
=======
        <body className={inter.className}>{children}</body>
>>>>>>> 9c41f12f419b04f98443bb68f6dea5672469a670
      </html>
    </SessionProvider>
  );
}