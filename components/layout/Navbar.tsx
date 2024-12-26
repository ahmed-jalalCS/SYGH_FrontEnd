"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0A2647] px-4 py-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white text-2xl font-bold">
          SYGH
        </Link>

        {/* Navigation Links - Updated with mobile menu */}
        <div className={`${
          isMobileMenuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 right-0 bg-[#0A2647] md:bg-transparent py-4 md:py-0 space-y-4 md:space-y-0 md:items-center md:space-x-6 z-50`}>
          <Link href="/" className="text-white hover:text-gray-300 px-4 md:px-0">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-gray-300 px-4 md:px-0">
            About
          </Link>
          <Link href="/projects" className="text-white hover:text-gray-300 px-4 md:px-0">
            Projects
          </Link>
          <Link href="/universities" className="text-white hover:text-gray-300 px-4 md:px-0">
            Universities
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-300 px-4 md:px-0">
            Contact Us
          </Link>
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

        {/* Mobile Menu Button - Updated with onClick handler */}
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