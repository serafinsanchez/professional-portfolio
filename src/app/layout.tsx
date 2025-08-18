import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Serafin Sanchez - Developer Portfolio",
  description: "Full-stack developer with a passion for creating beautiful, functional web experiences",
  keywords: ["developer", "portfolio", "react", "next.js", "typescript"],
  authors: [{ name: "Serafin Sanchez" }],
  creator: "Serafin Sanchez",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://serafinsanchez.dev",
    title: "Serafin Sanchez - Developer Portfolio",
    description: "Full-stack developer with a passion for creating beautiful, functional web experiences",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serafin Sanchez - Developer Portfolio",
    description: "Full-stack developer with a passion for creating beautiful, functional web experiences",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
