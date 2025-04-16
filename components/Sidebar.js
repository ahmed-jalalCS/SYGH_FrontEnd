"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  FiBook,
  FiUserCheck,
  FiUsers,
  FiShield,
  FiHome,
  FiCheckCircle,
  FiClipboard,
  FiUser,
  FiLayers,
  FiInfo,
  
  FiArrowRightCircle,
} from "react-icons/fi";

const adminLinks = [
  { name: "لوحة التحكم", path: "/dashboard/admin", icon: <FiUsers /> },
  { name: "الكليات", path: "/dashboard/admin/colleges", icon: <FiBook /> },
  {
    name: "موظفو المكتبة",
    path: "/dashboard/admin/library-staff",
    icon: <FiUserCheck />,
  },
];

const superAdminLinks = [
  { name: "لوحة التحكم", path: "/dashboard/super-admin", icon: <FiHome /> },
  {
    name: "الجامعات",
    path: "/dashboard/super-admin/universities",
    icon: <FiShield />,
  },
  {
    name: "المسؤولون",
    path: "/dashboard/super-admin/admins",
    icon: <FiUserCheck />,
  },
];

const libraryStaffLinks = [
  { name: "لوحة التحكم", path: "/dashboard/library", icon: <FiHome /> },
  { name: "الطلاب", path: "/dashboard/library/students", icon: <FiUser /> },
  {
    name: " حسابات الطلاب",
    path: "/dashboard/library/student-info",
    icon: <FiInfo />,
  },
  {
    name: "الأقسام",
    path: "/dashboard/library/departments",
    icon: <FiLayers />,
  },
  {
    name: "المشاريع",
    path: "/dashboard/library/projects",
    icon: <FiClipboard />,
  },
  {
    name: "المشرفون",
    path: "/dashboard/library/supervisors",
    icon: <FiUserCheck />,
  },
  {
    name: " حسابات المشرفون",
    path: "/dashboard/library/supervisor-info",
    icon: <FiInfo />,
  },
  {
    name: "الموافقات",
    path: "/dashboard/library/approvals",
    icon: <FiCheckCircle />,
  },
];

export default function Sidebar({ isOpen, role = "admin" }) {
  const pathname = usePathname();
  const router = useRouter();

  const links =
    role === "super-admin"
      ? superAdminLinks
      : role === "library-staff"
      ? libraryStaffLinks
      : adminLinks;

  const title =
    role === "super-admin"
      ? "مشرف النظام"
      : role === "library-staff"
      ? "موظف المكتبة"
      : "لوحة المشرف";

  

  return (
    <aside
      className={`bg-gray-800 text-white h-screen fixed top-0 right-0 z-40 transition-all duration-300
        ${isOpen ? "w-64" : "w-0"} overflow-hidden lg:w-64`}
      dir="rtl"
    >
      <div className="p-4 text-xl font-bold flex items-center justify-center border-b border-gray-700">
        <span className="hidden lg:block">{title}</span>
        <span className="lg:hidden text-2xl">🛠️</span>
      </div>

      <nav className="mt-4 flex flex-col justify-between h-[calc(100%-4rem)]">
        <ul>
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition
                  ${pathname === link.path ? "bg-gray-700" : ""}`}
              >
                <span className="text-lg">{link.icon}</span>
                <span className="hidden lg:inline">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom Actions */}
        <div className="border-t border-gray-700 p-3 mt-6">
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition text-white"
          >
            <FiArrowRightCircle className="text-lg" />
            <span className="hidden lg:inline">الصفحة الرئيسية</span>
          </button>

          <button
            onClick={() => router.push("/profile")}
            className="w-full mt-2 flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition text-white"
          >
            <FiUser className="text-lg" />
            <span className="hidden lg:inline">الملف الشخصي</span>
          </button>

          
        </div>
      </nav>
    </aside>
  );
}
