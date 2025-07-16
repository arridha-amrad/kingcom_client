import SpecialOfferAlert from "@/components/Alert/SpecialOfferAlert";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewsLetter from "@/components/NewsLetter";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  display: "swap",
  variable: "--font-satoshi",
});

const integralCF = localFont({
  src: "./fonts/integralcf-bold.otf",
  display: "swap",
  variable: "--font-integral",
});

export const metadata: Metadata = {
  title: "Kingcom",
  description: "Compure Store",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${satoshi.variable} ${integralCF.variable} antialiased`}
      >
        <NextTopLoader showSpinner={false} color="red" />
        <ThemeProvider>
          <div className="w-full container mx-auto">
            <SpecialOfferAlert />
            <Header />
            {children}
            <div className="relative pt-10">
              <NewsLetter />
              <Footer />
            </div>
          </div>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
