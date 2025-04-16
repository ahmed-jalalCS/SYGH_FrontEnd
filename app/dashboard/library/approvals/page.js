"use client";

import { useState, useEffect } from "react";
import {
  FiFileText,
  FiCheckCircle,
  FiXCircle,
  FiInfo,
  FiExternalLink,
} from "react-icons/fi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function ApprovalsManagementPage() {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [modal, setModal] = useState(null); // { id, action, title }

  const API_BASE = "http://127.0.0.1:8000/api";
  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const fetchApprovals = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE}/librarayStaff/projects/status`,
        { headers: getAuthHeaders() }
      );

      if (response.data.success && Array.isArray(response.data.data)) {
        setApprovals(response.data.data);
      } else {
        toast.error("فشل في تحميل بيانات المشاريع");
      }
    } catch (error) {
      console.error("خطأ في جلب الموافقات:", error);
      toast.error(
        error.response?.data?.message || "حدث خطأ أثناء تحميل البيانات"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      setActionLoading(true);

      if (action === "approve") {
        const response = await axios.put(
          `${API_BASE}/librarayStaff/projects/active/${id}`,
          {},
          { headers: getAuthHeaders() }
        );

        if (response.data.success) {
          toast.success("تمت الموافقة على المشروع بنجاح");
          setApprovals((prev) => prev.filter((item) => item.id !== id));
        } else {
          toast.error(response.data.message || "فشل في الموافقة على المشروع");
        }
      } else if (action === "reject") {
        toast.success("تم رفض المشروع");
        setApprovals((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error(`خطأ أثناء ${action} المشروع:`, error);
      toast.error(error.response?.data?.message || `فشل في ${action} المشروع`);
    } finally {
      setActionLoading(false);
      setModal(null);
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FiFileText className="text-blue-600" />
          إدارة الموافقات
        </h2>

        <button
          onClick={fetchApprovals}
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

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : approvals.length === 0 ? (
        <div className="bg-white p-8 shadow-md rounded-lg text-center text-gray-600">
          <FiInfo className="mx-auto text-5xl mb-3 text-blue-500" />
          <h3 className="font-medium text-lg mb-2">
            لا توجد مشاريع بانتظار الموافقة
          </h3>
          <p className="text-gray-500">
            تم مراجعة جميع المشاريع. يرجى التحقق لاحقاً.
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <table className="w-full text-sm text-right">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-gray-600 font-medium">
                  اسم المشروع
                </th>
                <th className="px-4 py-3 text-gray-600 font-medium">الوصف</th>
                <th className="px-4 py-3 text-gray-600 font-medium">السنة</th>
                <th className="px-4 py-3 text-gray-600 font-medium">الطالب</th>
                <th className="px-4 py-3 text-gray-600 font-medium">الملف</th>
                <th className="px-4 py-3 text-center text-gray-600 font-medium">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {approvals.map((project) => (
                <tr
                  key={project.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {project.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {project.description?.length > 50
                      ? `${project.description.substring(0, 50)}...`
                      : project.description || "لا يوجد وصف"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(project.projectYear).getFullYear()}
                  </td>
                  <td className="px-4 py-3">
                    {project.student_name ? (
                      <span className="text-blue-600">
                        {project.student_name}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">
                        لا يوجد قائد فريق
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {project.pathDo ? (
                      <Link
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        href={project.pathDo}
                        target="_blank"
                      >
                        <FiExternalLink /> عرض الملف
                      </Link>
                    ) : (
                      <span className="text-gray-400 italic">لا يوجد ملف</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center flex justify-center gap-3">
                    <button
                      onClick={() =>
                        setModal({
                          id: project.id,
                          action: "approve",
                          title: project.title,
                        })
                      }
                      className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium"
                    >
                      <FiCheckCircle />
                      موافقة
                    </button>
                    <button
                      onClick={() =>
                        setModal({
                          id: project.id,
                          action: "reject",
                          title: project.title,
                        })
                      }
                      className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium"
                    >
                      <FiXCircle />
                      رفض
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* نافذة التأكيد */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              تأكيد {modal.action === "approve" ? "الموافقة" : "الرفض"}
            </h3>
            <p className="text-gray-600 mb-6">
              هل أنت متأكد أنك تريد{" "}
              {modal.action === "approve" ? "الموافقة على" : "رفض"} المشروع:
              <span className="block font-medium text-blue-600 mt-2">
                "{modal.title}"
              </span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setModal(null)}
                disabled={actionLoading}
                className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleAction(modal.id, modal.action)}
                disabled={actionLoading}
                className={`px-4 py-2 rounded text-white flex items-center gap-2 ${
                  modal.action === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                } transition-colors`}
              >
                {actionLoading ? (
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
                    جاري التنفيذ...
                  </>
                ) : (
                  <>
                    {modal.action === "approve" ? (
                      <FiCheckCircle />
                    ) : (
                      <FiXCircle />
                    )}
                    تأكيد
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
