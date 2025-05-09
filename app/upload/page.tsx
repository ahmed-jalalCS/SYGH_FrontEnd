"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import toast from "react-hot-toast";

const secretKey = "my_secret_key_123";

const UploadProjectForm = () => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const [formData, setFormData] = useState({
    description: "",
    videoUrl: "",
    pathDo: null,
  });

  const [status, setStatus] = useState({
    loading: false,
    message: "",
    success: null as boolean | null,
  });

  // ✅ فك تشفير بيانات المستخدم
  const getDecryptedUser = () => {
    try {
      const encryptedUser = localStorage.getItem("user");
      if (!encryptedUser) return null;
      const bytes = CryptoJS.AES.decrypt(encryptedUser, secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error("فشل فك التشفير:", error);
      return null;
    }
  };

  // ✅ التحقق من الصلاحية
  useEffect(() => {
    const user = getDecryptedUser();

    if (user?.role_id === 5 && user.students?.[0]?.isTemLeder === 1) {
      setAuthorized(true); // ✅ السماح بالوصول
    } else {
      toast.error("ليس لديك صلاحية للوصول إلى هذه الصفحة.");
      router.push("/403"); // ❌ منع غير المصرح لهم
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, pathDo: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", success: null });

    const token = localStorage.getItem("token");
    if (!token) {
      setStatus({
        loading: false,
        message: "رمز التوثيق مفقود.",
        success: false,
      });
      return;
    }

    const data = new FormData();
    data.append("description", formData.description);
    if (formData.videoUrl) data.append("videoUrl", formData.videoUrl);
    if (formData.pathDo) data.append("pathDo", formData.pathDo);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/project/uploade",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "فشل في رفع المشروع.");

      setStatus({ loading: false, message: result.message, success: true });

      if (result.project?.document?.pathDo) {
        window.open(result.project.document.pathDo, "_blank");
      }
    } catch (err: any) {
      setStatus({ loading: false, message: err.message, success: false });
    }
  };

  // ✅ لا تعرض النموذج إذا لم يتم التحقق من الصلاحية بعد
  if (!authorized) return null;

  return (
    <div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8 text-right">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          رفع المشروع
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              وصف المشروع *
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رابط الفيديو (اختياري)
            </label>
            <input
              type="url"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              placeholder="https://example.com/video"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              مستند المشروع *
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-100 file:text-blue-700 file:rounded-lg file:cursor-pointer"
            />
            <p className="text-sm text-gray-400 mt-1">
              الملفات المدعومة: PDF, DOC, DOCX (الحد الأقصى 10MB)
            </p>
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {status.loading ? "جاري الرفع..." : "رفع المشروع"}
          </button>

          {status.message && (
            <p
              className={`text-sm mt-2 text-center ${
                status.success ? "text-green-600" : "text-red-500"
              }`}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadProjectForm;
