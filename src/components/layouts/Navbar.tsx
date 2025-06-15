"use client";
import { User, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from "@/components/layouts/styles.module.css";
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import UserDropDownMenu from '@/components/layouts/UserDropDownMenu';
import LoginModal from '@/components/auth/LoginModal';
import ForgetPasswordModal from '@/components/auth/ForgetPasswordModal';

interface NavbarProps {
  navLinks: { key: string; link: string }[];
}

const Navbar = ({ navLinks }: NavbarProps) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [forgetPasswordModalOpen, setForgetPasswordModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const loggedIn = false; // Replace with actual authentication logic
  return (
    <header className="h-[88px]">
      <div className="container h-full mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src="/logo.svg" alt="miqdar-logo" width={84} height={64}
              className="w-[50px] md:w-20 h-auto"
              unoptimized
            />
          </Link>
        </div>
        <nav className="flex items-center gap-8 h-full">
          <ul className="hidden lg:flex items-center gap-x-9 text-secondary">
            {navLinks.map((item, i) => (
              <li
                key={i}
                className={` ${styles.nav_link} ${
                  pathname === item.link ? styles.nav_link_active : ''
                }`}
              >
                <Link href={item.link}>{item.key}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-x-4">
          {loggedIn &&
            <div className="lg:hidden">
              <UserDropDownMenu />
            </div>
          }
          <motion.button
            className="lg:hidden ms-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: mobileOpen ? 90 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {mobileOpen ? 
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu-icon lucide-menu">
                <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
              </svg>
            }
          </motion.button>
        </div>
        {loggedIn ? (
          <div className="hidden lg:flex">
            <UserDropDownMenu />
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-8">
            {/* <LoginModal /> */}
            <button className="secondary-button whitespace-nowrap flex-nowrap !px-3 !py-2" onClick={() => setLoginModalOpen(true)}>
              <User />
              <span>تسجيل الدخول</span>
            </button>
            <Link href="/register" className="primary-button !gap-2 !px-6 flex items-center">
              <UserPlus />
              <span>التسجيل</span>
            </Link>
          </div>
        )}
      </div>
      <ForgetPasswordModal
        open={forgetPasswordModalOpen}
        onOpenChange={setForgetPasswordModalOpen}
        loginModalOnOpenChange={setLoginModalOpen}
      />
      <LoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        forgetPasswordModalOnOpenChange={setForgetPasswordModalOpen}
      />
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden px-4 py-6 bg-white shadow-md rounded-b-2xl mx-2 mt-1 z-1000 relative"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col gap-4 text-sm text-primary">
              {navLinks.map((item) => (
                <li
                  key={item.key}
                  className="hover:text-tertiary transition-colors duration-200 cursor-pointer"
                >
                  <Link href={item.link}>{item.key}</Link>
                </li>
              ))}
              {!loggedIn &&
              <div className="flex items-center gap-2 sm:gap-8">
                <button className="secondary-button whitespace-nowrap flex-nowrap !px-3 !py-2" onClick={() => setLoginModalOpen(true)}>
                  <User />
                  <span>تسجيل الدخول</span>
                </button>
                <Link href="/register" className="rounded-[8px] whitespace-nowrap flex items-center gap-2 bg-primary hover:bg-primary/90 text-white py-2 px-6 flex-nowrap">
                  <span>التسجيل</span>
                  <UserPlus />
                </Link>
              </div>}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar;