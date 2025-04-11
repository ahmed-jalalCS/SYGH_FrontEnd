"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      logout();
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        logout();
        router.push("/login");
      } else {
        console.error("Failed to logout:", await response.text());
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <nav className="bg-[#0A2647] px-4 py-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Profile icon (top-right corner) */}
        {isLoggedIn && (
          <div className="absolute top-4 right-4">
            <Link href="/profile" className="text-white text-2xl font-bold">
              <FaUserCircle
                className="text-white text-3xl cursor-pointer hover:text-green-400 transition"
                title="Profile"
              />
            </Link>
          </div>
        )}

        {/* Logo */}
        <Link href="/" className="text-white text-2xl font-bold">
          SYGH
        </Link>

        {/* Navigation Links */}
        <div
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 right-0 bg-[#0A2647] md:bg-transparent py-4 md:py-0 space-y-4 md:space-y-0 md:items-center md:space-x-6 z-50`}
        >
          <Link
            href="/"
            className="text-white hover:text-gray-300 px-4 md:px-0"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-gray-300 px-4 md:px-0"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="text-white hover:text-gray-300 px-4 md:px-0"
          >
            Projects
          </Link>
          <Link
            href="/universities"
            className="text-white hover:text-gray-300 px-4 md:px-0"
          >
            Universities
          </Link>
          <Link
            href="/contact"
            className="text-white hover:text-gray-300 px-4 md:px-0"
          >
            Contact Us
          </Link>

          {/* Auth Buttons */}
          {!isLoggedIn ? (
            <div className="flex items-center ml-28 space-x-6">
              <button
                onClick={handleLoginRedirect}
                className="text-white hover:text-green-400 border border-white px-3 py-1 rounded-md ml-12"
              >
                Login
              </button>
              <Link
                href="/signup"
                className="text-white hover:text-green-400 border border-white px-3 py-1 rounded-md ml-3"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="relative flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="text-white hover:text-red-400 border border-white px-3 py-1 rounded-md ml-8"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
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
            </button>
          </div>
        </div>

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
      </div>
    </nav>
  );
};

export default Navbar;
