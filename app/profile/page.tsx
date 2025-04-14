"use client";

import { useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext"
const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "جون دو",
    email: "john.doe@example.com",
    social: {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
    },
  });

  const [socialForm, setSocialForm] = useState(user.social);
  const { isLoggedIn, logout, isLoading } = useUser();
    const router = useRouter();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSocialChange = (e: any) => {
    setSocialForm({ ...socialForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: any) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const updateSocialLinks = (e: any) => {
    e.preventDefault();
    setUser({ ...user, social: socialForm });
    alert("تم تحديث روابط التواصل الاجتماعي!");
  };

  const updatePassword = (e: any) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("كلمات المرور الجديدة غير متطابقة!");
      return;
    }

    if (!passwordForm.currentPassword) {
      alert("يرجى إدخال كلمة المرور الحالية.");
      return;
    }

    alert("تم تغيير كلمة المرور بنجاح!");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
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


  return (
    <div
      className="min-h-screen bg-[#f4f4f4] flex justify-center items-start px-4 py-10"
      dir="rtl"
    >
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl text-right">
        <h1 className="text-2xl font-bold text-[#0A2647] text-center mb-6">
          إدارة حسابك الشخصي
        </h1>

        {/* معلومات المستخدم */}
        <div className="mb-8 border-b pb-6">
          <p className="text-lg font-semibold text-gray-800 mb-1">
            👤 {user.name}
          </p>
          <p className="text-sm text-gray-500 mb-3">{user.email}</p>
          <div className="flex space-x-reverse space-x-4 text-2xl text-[#0A2647] justify-start">
            <a
              href={user.social.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href={user.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href={user.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* نموذج تعديل روابط التواصل */}
        <form onSubmit={updateSocialLinks} className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            تحديث روابط التواصل الاجتماعي
          </h2>
          <input
            type="text"
            name="github"
            value={socialForm.github}
            onChange={handleSocialChange}
            placeholder="رابط GitHub"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="linkedin"
            value={socialForm.linkedin}
            onChange={handleSocialChange}
            placeholder="رابط LinkedIn"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="twitter"
            value={socialForm.twitter}
            onChange={handleSocialChange}
            placeholder="رابط Twitter"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="bg-[#0A2647] text-white px-4 py-2 rounded-md hover:bg-blue-900 transition"
          >
            حفظ الروابط
          </button>
        </form>

        {/* نموذج تغيير كلمة المرور */}
        <form onSubmit={updatePassword} className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            تغيير كلمة المرور
          </h2>
          <input
            type="password"
            name="currentPassword"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
            placeholder="كلمة المرور الحالية"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="password"
            name="newPassword"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            placeholder="كلمة المرور الجديدة"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={passwordForm.confirmPassword}
            onChange={handlePasswordChange}
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
