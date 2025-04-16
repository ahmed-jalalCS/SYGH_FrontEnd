"use client";

import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDecryptedUser } from "@/utils/decryptUser";

export default function LibraryLayout({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState (null) 

  useEffect(() => {
    const user = getDecryptedUser();

    // 🔒 تحقق من أن المستخدم لديه صلاحية موظف مكتبة (role_id = 3)
    if (!user || user.role_id !== 3) {
      router.replace("/403");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // ⏳ أثناء التحقق من الصلاحية لا تعرض أي شيء لتجنب الوميض
  if (authorized === null) {
    return null;
  }
return (
  <div className="flex flex-row-reverse">
    <Sidebar isOpen={true} role="library-staff" />
    <main className="mr-64 p-6 w-full bg-gray-50 min-h-screen">{children}</main>
  </div>
);
}
