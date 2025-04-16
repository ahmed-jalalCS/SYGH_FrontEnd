"use client"
import Sidebar from "@/components/Sidebar";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { getDecryptedUser } from "@/utils/decryptUser";
export default function SuperAdminLayout({ children }) {
   const router = useRouter();

const [authorized, setAuthorized] = useState(null);

 useEffect(() => {
   const user = getDecryptedUser();
   if (!user || user.role_id !== 1) {
     router.replace("/403"); // redirect immediately
   } else {
     setAuthorized(true);
   }
 }, [router]);

 if (authorized === null) {
   // avoid flicker: don’t render anything until auth check is done
   return null;
 }
 return (
   <div className="flex flex-row-reverse">
     <Sidebar isOpen={true} role="super-admin" />
     <main className="mr-64 p-6 w-full bg-gray-50 min-h-screen">{children}</main>
   </div>
 );
}
