"use client";

import { Mail, MessageCircleMore } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface FooterProps {
  navLinks: { key: string; link: string }[];
}

const Footer = ({ navLinks }: FooterProps) => {
    const pathname = usePathname();
  return (
    <footer className="bg-[#111827] text-[#9CA3AF] pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row gap-y-8 justify-between">
          <div className="flex flex-col gap-8">
            <Image src="/footer_logo.svg" alt="miqdar-logo" width={119} height={73}
              className="w-[119px] h-auto"
              unoptimized
            />
            <p>حلول ذكية للقياسات الدقيقة لمصممي المنتجات </p>
            <div className="flex items-center gap-8">
              <Link href="https://www.linkedin.com/company/miqdar/" target="_blank">
                <Image src="/linked.svg" alt="linked" width={16} height={16}
                  className="w-[16px] h-auto"
                  unoptimized
                />
              </Link>
              <Link href="https://www.instagram.com/miqdarsa/profilecard/?igsh=NmhqNjR1ZjNtOG14" target="_blank">
                <Image src="/insta.svg" alt="linked" width={16} height={16}
                  className="w-[16px] h-auto"
                  unoptimized
                />
              </Link>
              <Link href="mailto:info@miqdarsa.com" target="_blank">
                <Mail size={20} />
              </Link>
              <Link href="http://wa.me/966553372491" target="_blank">
                <MessageCircleMore size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-white text-[18px] font-bold mb-4">روابط سريعة</h3>
            <div className="flex flex-col gap-5">
              <ul className="flex flex-col gap-2 text-secondary">
                {navLinks.map((item, i) => (
                  <li
                    key={i}
                    className={` hover:text-primary text-[#9CA3AF] ${
                      pathname === item.link ? 'text-primary' : ''
                    }`}
                  >
                    <Link href={item.link}>{item.key}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-[18px] font-bold">النشرة الإخبارية</h3>
            <p className="text-[#9CA3AF]">اشترك للحصول على آخر التحديثات والميزات الجديدة </p>
            <form className="flex gap-2 mt-2">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="px-3 py-2 rounded-md bg-[#1F2937] text-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-primary w-full max-w-[250px]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
              >
                اشترك
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-[#374151] my-8"></div>
        <p className="text-center">© 2025 مقدار. جميع الحقوق محفوظة </p>
      </div>
    </footer>
  )
}

export default Footer;