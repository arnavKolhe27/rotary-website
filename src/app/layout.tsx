import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rotary Club of Amravati Ambika",
  description: "Official Digital Portal for the Rotary Club of Amravati Ambika, District 3030.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-navy-900">
        <SplashScreen />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <a
          href="https://www.linkedin.com/in/arnavkolhe27/"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-navy-900 hover:bg-navy-800 transition-colors rounded-full px-4 py-2.5 shadow-md"
  style={{ textDecoration: 'none', color: 'inherit' }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4.5 h-4.5 text-white"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
  <span className="text-sm font-medium leading-none text-white">Made by Arnav Kolhe</span>
</a>
      </body>
    </html>
  );
}
