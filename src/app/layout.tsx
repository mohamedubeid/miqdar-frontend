import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "مقدار",
  description:
    "وفر الوقت والجهد في البحث عن قياسات المنتجات. حلل تصاميمك أو استعرض مكتبتنا للقياسات الدقيقة.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLinks: { key: string; link: string }[] = [
    { key: "الرئيسية", link: "/" },
    { key: "تحليل تصميم", link: "/تحليل-تصميم" },
    { key: "مكتبة المنتجات", link: "/مكتبة-المنتجات" },
    { key: "عن مقدار", link: "/عن-مقدار" },
    { key: "تواصل معنا", link: "/تواصل-معنا" },
  ];

  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar navLinks={navLinks} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
