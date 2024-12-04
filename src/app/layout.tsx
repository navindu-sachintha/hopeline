import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Header from "@/components/shared/Header";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Hopeline",
  description: "Keep hopes alive",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
        <Header/>
        {children}
        <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
