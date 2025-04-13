// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useUser } from "@/app/context/UserContext";
// import { FaUserCircle } from "react-icons/fa";

// const Navbar = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { isLoggedIn, logout, isLoading } = useUser();
//   const router = useRouter();

//   const handleLogout = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       logout();
//       router.push("/login");
//       return;
//     }

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/logout", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         logout();
//         router.push("/login");
//       } else {
//         console.error("Failed to logout:", await response.text());
//       }
//     } catch (err) {
//       console.error("Logout error:", err);
//     }
//   };

//   const handleLoginRedirect = () => {
//     router.push("/login");
//   };

//   return (
//     <nav className="bg-[#0A2647] px-4 py-4 relative z-50" dir="rtl">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         {/* Profile icon */}
//         {isLoggedIn && (
//           <div className="absolute top-4 left-4">
//             <Link href="/profile" className="text-white text-2xl font-bold">
//               <FaUserCircle
//                 className="text-white text-3xl cursor-pointer hover:text-green-400 transition"
//                 title="الملف الشخصي"
//               />
//             </Link>
//           </div>
//         )}

//         {/* Logo */}
//         <Link href="/" className="text-white text-2xl font-bold">
//           SYGH
//         </Link>

//         {/* Navigation Links */}
//         <div
//           className={`${
//             isMobileMenuOpen ? "flex" : "hidden"
//           } md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 right-0 left-0 bg-[#0A2647] md:bg-transparent py-4 md:py-0 space-y-4 md:space-y-0 md:items-center md:space-x-reverse md:space-x-6 z-50`}
//         >
//           <Link
//             href="/"
//             className="text-white hover:text-gray-300 px-4 md:px-0"
//           >
//             الرئيسية
//           </Link>
//           <Link
//             href="/about"
//             className="text-white hover:text-gray-300 px-4 md:px-0"
//           >
//             من نحن
//           </Link>
//           <Link
//             href="/projects"
//             className="text-white hover:text-gray-300 px-4 md:px-0"
//           >
//             المشاريع
//           </Link>
//           <Link
//             href="/universities"
//             className="text-white hover:text-gray-300 px-4 md:px-0"
//           >
//             الجامعات
//           </Link>
//           <Link
//             href="/contact"
//             className="text-white hover:text-gray-300 px-4 md:px-0"
//           >
//             تواصل معنا
//           </Link>

//           {/* Auth Buttons */}
//           {!isLoading &&
//             (!isLoggedIn ? (
//               <div className="flex items-center mr-28 space-x-reverse space-x-6">
//                 <button
//                   onClick={handleLoginRedirect}
//                   className="text-white hover:text-green-400 border border-white px-3 py-1 rounded-md"
//                 >
//                   تسجيل الدخول
//                 </button>
//                 <Link
//                   href="/signup"
//                   className="text-white hover:text-green-400 border border-white px-3 py-1 rounded-md"
//                 >
//                   إنشاء حساب
//                 </Link>
//               </div>
//             ) : (
//               <div className="relative flex items-center space-x-reverse space-x-4">
//                 <button
//                   onClick={handleLogout}
//                   className="text-white hover:text-red-400 border border-white px-3 py-1 rounded-md"
//                 >
//                   تسجيل الخروج
//                 </button>
//               </div>
//             ))}
//         </div>

//         {/* Search Bar */}
//         <div className="hidden md:flex items-center">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="ابحث عن مشروع..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 w-64 text-right"
//             />
//             <button className="absolute left-3 top-1/2 transform -translate-y-1/2">
//               <svg
//                 className="w-5 h-5 text-gray-500"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu Toggle */}
//         <div className="md:hidden">
//           <button
//             className="text-white"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout, isLoading } = useUser();
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
          <Link href="/" className="text-white hover:text-gray-300">
            الرئيسية
          </Link>
          <Link href="/about" className="text-white hover:text-gray-300">
            من نحن
          </Link>
          <Link href="/projects" className="text-white hover:text-gray-300">
            المشاريع
          </Link>
          <Link href="/universities" className="text-white hover:text-gray-300">
            الجامعات
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-300">
            تواصل معنا
          </Link>

          {/* Auth Buttons */}
          {!isLoading &&
            (!isLoggedIn ? (
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-2 md:mt-0">
                <button
                  onClick={handleLoginRedirect}
                  className="text-white border border-white hover:text-green-400 px-3 py-1 rounded-md"
                >
                  تسجيل الدخول
                </button>
                <Link
                  href="/signup"
                  className="text-white border border-white hover:text-green-400 px-3 py-1 rounded-md"
                >
                  إنشاء حساب
                </Link>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
                <Link href="/profile">
                  <FaUserCircle
                    className="text-white text-2xl hover:text-green-400"
                    title="الملف الشخصي"
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white border border-white hover:text-red-400 px-3 py-1 rounded-md"
                >
                  تسجيل الخروج
                </button>
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
