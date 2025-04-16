"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  FiUserCheck,
  FiSearch,
  FiDownload,
  FiCopy,
  FiMail,
  FiKey,
} from "react-icons/fi";

export default function SupervisorInfoPage() {
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [copySuccess, setCopySuccess] = useState(null);

  const API_BASE = "http://127.0.0.1:8000/api";
  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const fetchSupervisorInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE}/librarayStaff/supervisors/information`,
        { headers: getAuthHeaders() }
      );

      if (response.data.success && Array.isArray(response.data.data)) {
        setSupervisors(response.data.data);
      } else {
        toast.error("فشل في تحميل بيانات المشرفين");
      }
    } catch (error) {
      console.error("خطأ في تحميل بيانات المشرفين:", error);
      toast.error(
        error.response?.data?.message || "حدث خطأ أثناء تحميل البيانات"
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, id) => {
    if (!text) return;

    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess(id);
        setTimeout(() => setCopySuccess(null), 2000);
        toast.success("تم النسخ!");
      },
      () => {
        toast.error("فشل النسخ");
      }
    );
  };

  const exportToCSV = () => {
    const filteredData = search.trim()
      ? supervisors.filter((supervisor) =>
          supervisor.user?.name?.toLowerCase().includes(search.toLowerCase())
        )
      : supervisors;

    const headers = [
      "رقم المشرف",
      "الاسم",
      "البريد الإلكتروني",
      "كلمة المرور",
      "المؤهل",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredData.map((supervisor) =>
        [
          `"${supervisor.id || ""}"`,
          `"${supervisor.user?.name || ""}"`,
          `"${supervisor.user?.email || ""}"`,
          `"${supervisor.user?.plain_password || ""}"`,
          `"${supervisor.supervisorDgree || ""}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "بيانات_المشرفين.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("تم تصدير البيانات بنجاح");
  };

  const filteredSupervisors = search.trim()
    ? supervisors.filter((supervisor) =>
        supervisor.user?.name?.toLowerCase().includes(search.toLowerCase())
      )
    : supervisors;

  useEffect(() => {
    fetchSupervisorInfo();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto" dir="rtl">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FiUserCheck className="text-blue-600" />
          بيانات المشرفين
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <FiDownload /> تصدير CSV
          </button>

          <button
            onClick={fetchSupervisorInfo}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                جاري التحديث...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                تحديث
              </>
            )}
          </button>
        </div>
      </div>

      {/* حقل البحث */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن مشرف بالاسم..."
            className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          {search.trim().length > 0 && (
            <button
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* جدول المشرفين */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredSupervisors.length === 0 ? (
        <div className="bg-white p-8 shadow-md rounded-lg text-center text-gray-600">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            لا يوجد مشرفون
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {search.trim()
              ? `لا توجد نتائج لـ "${search}"`
              : "لا توجد بيانات مشرفين حالياً."}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-gray-600 font-medium">
                    رقم المشرف
                  </th>
                  <th className="px-4 py-3 text-gray-600 font-medium">الاسم</th>
                  <th className="px-4 py-3 text-gray-600 font-medium">
                    البريد الإلكتروني
                  </th>
                  <th className="px-4 py-3 text-gray-600 font-medium">
                    كلمة المرور
                  </th>
                  <th className="px-4 py-3 text-gray-600 font-medium">
                    المؤهل
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSupervisors.map((supervisor) => (
                  <tr
                    key={supervisor.id}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {supervisor.id}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {supervisor.user?.name || (
                        <span className="text-gray-400 italic">غير محدد</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-blue-600 flex items-center">
                      {supervisor.user?.email}
                      <button
                        onClick={() =>
                          copyToClipboard(
                            supervisor.user?.email,
                            `email-${supervisor.id}`
                          )
                        }
                        className="ml-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="نسخ البريد"
                      >
                        <FiCopy size={14} />
                      </button>
                      {copySuccess === `email-${supervisor.id}` && (
                        <span className="ml-2 text-green-500 text-xs">
                          تم النسخ!
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {supervisor.user?.plain_password ? (
                        <div className="flex items-center">
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                            {supervisor.user.plain_password}
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                supervisor.user.plain_password,
                                `pwd-${supervisor.id}`
                              )
                            }
                            className="ml-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="نسخ كلمة المرور"
                          >
                            <FiCopy size={14} />
                          </button>
                          {copySuccess === `pwd-${supervisor.id}` && (
                            <span className="ml-2 text-green-500 text-xs">
                              تم النسخ!
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">
                          لا توجد كلمة مرور
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {supervisor.supervisorDgree || (
                        <span className="text-gray-400 italic">غير محدد</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ملخص النتائج */}
      {!loading && filteredSupervisors.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          عرض {filteredSupervisors.length} مشرف
          {search.trim() && ` نتيجة لـ "${search}"`}
        </div>
      )}
    </div>
  );
}
