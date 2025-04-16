"use client";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { getDecryptedUser } from "@/utils/decryptUser";
import Layout from "../../../components/Layout";
import Sidebar from "@/components/Sidebar";
export default function AdminLayout({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const user = getDecryptedUser();
    if (!user || user.role_id !== 2) {
      router.replace("/403"); // redirect immediately
    } else {
      setAuthorized(true);
    }
  }, [router]);

  return (
    <div className="flex flex-row-reverse">
      <Sidebar isOpen={true} role="admin" />
      <main className="mr-64 p-6 w-full bg-gray-50 min-h-screen">{children}</main>
    </div>
  );
}
