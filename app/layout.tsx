import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import Navbar from "@/components/layout/Navbar";
import TokenBanner from "@/components/layout/TokenBanner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ChadWallet — trade any Solana token in seconds",
  description:
    "ChadWallet is the social-first trading app for Solana. From memecoins to viral tokens, sign in with Apple or Google and trade in seconds.",
  openGraph: {
    title: "ChadWallet — trade any Solana token in seconds",
    description:
      "The social-first trading app for Solana. Sign in with Apple or Google and trade in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <TokenBanner position="top" />
          <Navbar />
          <main className="flex-1">{children}</main>
          <TokenBanner position="bottom" reverse />
        </Providers>
      </body>
    </html>
  );
}
