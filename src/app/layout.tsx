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
    { key: "تحليل تصميم", link: "/تحليل-تصميم" },
    { key: "مكتبة المنتجات", link: "/مكتبة-المنتجات" },
    { key: "عن مقدار", link: "/عن-مقدار" },
    { key: "تواصل معنا", link: "/تواصل-معنا" },
  ];

  return (
    <html lang="ar" dir="rtl" className={IBM_Arabic.className}>
      <body className={`antialiased`}>
        <Navbar navLinks={navLinks} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
