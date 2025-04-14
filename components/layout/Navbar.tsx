"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();
const closeMobileMenu = () => setIsMobileMenuOpen(false);

  

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <nav className="bg-[#0A2647] px-4 py-3 shadow-md" dir="rtl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white text-2xl font-bold">
          SYGH
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-4 md:gap-6 items-center absolute md:static top-16 right-0 left-0 bg-[#0A2647] md:bg-transparent px-4 py-4 md:py-0 z-40`}
        >
          <Link
            href="/"
            className="text-white hover:text-gray-300"
            onClick={closeMobileMenu}
          >
            الرئيسية
          </Link>
          <Link
            href="#about"
            className="text-white hover:text-gray-300"
            onClick={closeMobileMenu}
          >
            من نحن
          </Link>
          <Link
            href="/projects"
            className="text-white hover:text-gray-300"
            onClick={closeMobileMenu}
          >
            المشاريع
          </Link>
          <Link
            href="/universities"
            className="text-white hover:text-gray-300"
            onClick={closeMobileMenu}
          >
            الجامعات
          </Link>
          <Link
            href="#contact"
            className="text-white hover:text-gray-300"
            onClick={closeMobileMenu}
          >
            تواصل معنا
          </Link>

          {/* Auth Buttons */}
          {!isLoading &&
            (!isLoggedIn ? (
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-2 md:mt-0">
                <button
                  onClick={handleLoginRedirect}
                  className="text-white border border-white hover:text-green-400 px-3 py-1 rounded-md"
                  onClick={closeMobileMenu}
                >
                  تسجيل الدخول
                </button>
                <Link
                  onClick={closeMobileMenu}
                  href="/signup"
                  className="text-white border border-white hover:text-green-400 px-3 py-1 rounded-md"
                >
                  إنشاء حساب
                </Link>
              </div>
            ) : (
              <div className="md:absolute md:top-2 md:left-4 md:block w-full md:w-auto mt-6 md:mt-0 flex justify-center md:justify-start">
                <Link
                  href="/profile"
                  className="text-white hover:text-green-400"
                  title="الملف الشخصي"
                  onClick={closeMobileMenu}
                >
                  <FaUserCircle className="text-4xl md:text-5xl transition duration-300" />
                </Link>
              </div>
            ))}
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center w-64">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="ابحث عن مشروع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
            />
            <span className="absolute right-3 top-2.5">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
