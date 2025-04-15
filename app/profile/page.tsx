"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const { logout } = useUser();

  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [linkes, setLinkes] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

 useEffect(() => {
   const fetchProfile = async () => {
     const token = localStorage.getItem("token");

     if (!token) {
       router.push("/403"); // ⛔️ توجيه إلى صفحة ممنوع
       return;
     }

     try {
       const response = await fetch("http://127.0.0.1:8000/api/profile", {
         headers: {
           Authorization: `Bearer ${token}`,
           Accept: "application/json",
         },
       });

       const result = await response.json();
       if (response.ok && result.data) {
         setUser(result.data);
         setName(result.data.name || "");

         if (
           result.data.role_id === 5 &&
           result.data.students?.[0]?.socialmedie?.[0]?.linkes
         ) {
           setLinkes(result.data.students[0].socialmedie[0].linkes);
         }
       } else {
         toast.error("فشل في تحميل بيانات المستخدم.");
         router.push("/403"); // ⛔️ توجيه أيضًا لو فشل في جلب البيانات (مثلاً غير مصرح)
       }
     } catch (err) {
       toast.error("حدث خطأ أثناء تحميل الملف الشخصي.");
       router.push("/403"); // ⛔️ توجيه في حالة أي خطأ
     }
   };

   fetchProfile();
 }, [router]);


  const updateProfile = async (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const body: any = { name };

      if (user.role_id === 5) {
        body.linkes = linkes;
      }

      const response = await fetch("http://127.0.0.1:8000/api/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("تم تحديث البيانات بنجاح!");
        setUser(result.data);
      } else {
        toast.error(result.message || "فشل في تحديث البيانات.");
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء التحديث.");
    }
  };

  const updatePassword = async (e: any) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = passwordForm;

    if (newPassword !== confirmPassword) {
      toast.error("كلمات المرور غير متطابقة.");
      return;
    }

    if (newPassword.length < 10) {
      toast.error("كلمة المرور يجب أن تكون 10 أحرف على الأقل.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old_password: oldPassword,
          password: newPassword,
          password_confirmation: confirmPassword,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("تم تغيير كلمة المرور بنجاح!");
        setPasswordForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(
          result.message ||
            result.errors?.password?.[0] ||
            "فشل في تغيير كلمة المرور."
        );
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء تغيير كلمة المرور.");
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.ok) {
        logout();
        router.push("/login");
      } else {
        toast.error("فشل في تسجيل الخروج.");
      }
    } catch (err) {
      toast.error("خطأ أثناء تسجيل الخروج.");
    }
  };

  if (!user)
    return <div className="text-center mt-20">جاري تحميل البيانات...</div>;

  return (
    <div
      className="min-h-screen bg-[#f4f4f4] flex justify-center items-start px-4 py-10"
      dir="rtl"
    >
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl text-right">
        <h1 className="text-2xl font-bold text-[#0A2647] text-center mb-6">
          إدارة حسابك الشخصي
        </h1>

        <form onSubmit={updateProfile} className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            تحديث البيانات العامة
          </h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اسم المستخدم"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          {user.role_id === 5 && (
            <input
              type="url"
              value={linkes}
              onChange={(e) => setLinkes(e.target.value)}
              placeholder="رابط LinkedIn أو GitHub"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          )}

          <button
            type="submit"
            className="bg-[#0A2647] text-white px-4 py-2 rounded-md hover:bg-blue-900 transition"
          >
            حفظ البيانات
          </button>
        </form>

        <form onSubmit={updatePassword} className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            تغيير كلمة المرور
          </h2>
          <input
            type="password"
            name="oldPassword"
            value={passwordForm.oldPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, oldPassword: e.target.value })
            }
            placeholder="كلمة المرور الحالية"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="password"
            name="newPassword"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, newPassword: e.target.value })
            }
            placeholder="كلمة المرور الجديدة"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={passwordForm.confirmPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                confirmPassword: e.target.value,
              })
            }
            placeholder="تأكيد كلمة المرور الجديدة"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="bg-[#0A2647] text-white px-4 py-2 rounded-md hover:bg-blue-900 transition"
          >
            تغيير كلمة المرور
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={handleLogout}
            className="text-red-600 font-semibold px-4 py-2 border border-red-600 rounded-md hover:bg-red-50 transition"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
