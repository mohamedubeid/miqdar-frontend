import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const IBM_Arabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-sans-arabic",
  subsets: ["arabic"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
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
    { key: "تحليل تصميم", link: "/design-analysis" },
    { key: "مكتبة المنتجات", link: "/product-library" },
    { key: "عن مقدار", link: "/about-miqdar" },
    { key: "تواصل معنا", link: "/contact-us" },
  ];

  return (
    <html lang="ar" dir="rtl" className={IBM_Arabic.className}>
      <body className={`antialiased`}>
        <Navbar navLinks={navLinks} />
        {children}
        <Footer navLinks={navLinks} />
      </body>
    </html>
  );
}
