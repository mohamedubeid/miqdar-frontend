import AuthStatusClientWrapper from "@/components/layouts/AuthStatusClientWrapper";
import Footer from "@/components/layouts/Footer";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {

  const navLinks: { key: string; link: string }[] = [
    { key: "الرئيسية", link: "/" },
    { key: "تحليل تصميم", link: "/design-analysis" },
    { key: "مكتبة المنتجات", link: "/product-library" },
    { key: "عن مقدار", link: "/about" },
    { key: "تواصل معنا", link: "/contact" },
  ];

  return (
    <main>
        <AuthStatusClientWrapper navLinks={navLinks}/>
          {children}
          <ToastContainer newestOnTop position={"top-left"} rtl={true} />
        <Footer navLinks={navLinks}/>
    </main>
  );

}