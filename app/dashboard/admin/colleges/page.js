"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash, FiPlus, FiInfo } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

const API_BASE = "http://127.0.0.1:8000/api";

export default function CollegesPage() {
  const [colleges, setColleges] = useState([]);
  const [university, setUniversity] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteId, setShowDeleteId] = useState(null);
  const [form, setForm] = useState({ name: "" });
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      // جلب الكليات الخاصة بجامعة المدير
      const res = await axios.get(`${API_BASE}/admin/colleges`, {
        headers: getAuthHeaders(),
      });

      // تحقق من وجود رسالة بدون بيانات
      if (res.data.message && !res.data.data) {
        setColleges([]);
        // لا تعرضها كخطأ، فقط كمعلومة
        if (res.data.success) {
          console.info(res.data.message);
        } else {
          setErrorMsg(res.data.message || "لم يتم العثور على كليات");
        }
      } else if (res.data.data) {
        setColleges(res.data.data);
      }
    } catch (err) {
      console.error("فشل في جلب الكليات:", err);
      setErrorMsg(err.response?.data?.message || "فشل في تحميل الكليات");
      toast.error("فشل في تحميل الكليات");
    } finally {
      setLoading(false);
    }
  };

  const getUniversityName = (id) => {
    // مؤقتًا إظهار المعرف فقط حتى تتوفر بيانات الجامعة
    return `الجامعة ${id || ""}`;
  };

  const resetForm = () => {
    setForm({ name: "" });
    setShowAddModal(false);
    setShowEditModal(null);
    setShowDeleteId(null);
  };

  const handleAdd = async () => {
    if (!form.name.trim()) {
      toast.error("اسم الكلية مطلوب");
      return;
    }

    const addToastId = toast.loading("جاري إضافة الكلية...");

    try {
      const formData = new FormData();
      formData.append("name", form.name.trim());

      const response = await axios.post(
        `${API_BASE}/admin/colleges`,
        formData,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "تمت إضافة الكلية بنجاح", {
          id: addToastId,
        });
        await fetchColleges();
        resetForm();
      } else {
        toast.error(response.data.message || "فشل في إضافة الكلية", {
          id: addToastId,
        });
      }
    } catch (err) {
      console.error("خطأ في الإضافة:", err);
      if (err.response?.data?.error) {
        if (typeof err.response.data.error === "object") {
          const firstError = Object.values(err.response.data.error)[0];
          toast.error(Array.isArray(firstError) ? firstError[0] : firstError, {
            id: addToastId,
          });
        } else {
          toast.error(err.response.data.error, { id: addToastId });
        }
      } else {
        toast.error(err.response?.data?.message || "فشل في إضافة الكلية", {
          id: addToastId,
        });
      }
    }
  };

  const handleUpdate = async () => {
    if (!form.name.trim()) {
      toast.error("اسم الكلية مطلوب");
      return;
    }

    const updateToastId = toast.loading("جاري تحديث الكلية...");

    try {
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("_method", "PUT");

      const response = await axios.post(
        `${API_BASE}/admin/colleges/${showEditModal}`,
        formData,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "تم تحديث الكلية بنجاح", {
          id: updateToastId,
        });
        await fetchColleges();
        resetForm();
      } else {
        toast.error(response.data.message || "فشل في تحديث الكلية", {
          id: updateToastId,
        });
      }
    } catch (err) {
      console.error("خطأ في التحديث:", err);
      if (err.response?.data?.error) {
        if (typeof err.response.data.error === "object") {
          const firstError = Object.values(err.response.data.error)[0];
          toast.error(Array.isArray(firstError) ? firstError[0] : firstError, {
            id: updateToastId,
          });
        } else {
          toast.error(err.response.data.error, { id: updateToastId });
        }
      } else {
        toast.error(err.response?.data?.message || "فشل في تحديث الكلية", {
          id: updateToastId,
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      const deleteToastId = toast.loading("جاري حذف الكلية...");

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("يجب تسجيل الدخول أولاً.", { id: deleteToastId });
        return;
      }

      try {
        const response = await axios({
          method: "DELETE",
          url: `${API_BASE}/admin/colleges/${showDeleteId}`,
          headers: getAuthHeaders(),
          timeout: 8000,
        });

        if (response.data.success) {
          toast.success(response.data.message || "تم حذف الكلية بنجاح", {
            id: deleteToastId,
          });
          await fetchColleges();
          resetForm();
        } else {
          toast.error(response.data.message || "فشل في حذف الكلية", {
            id: deleteToastId,
          });
        }
      } catch (err) {
        console.error("خطأ في الحذف:", err);

        if (err.response?.status === 401) {
          toast.error(
            "غير مصرح. ربما انتهت الجلسة. الرجاء تسجيل الدخول مجددًا.",
            { id: deleteToastId }
          );
        } else if (err.response?.status === 403) {
          toast.error("ليست لديك صلاحية لحذف هذه الكلية.", {
            id: deleteToastId,
          });
        } else if (
          err.response?.status === 400 &&
          err.response?.data?.message
        ) {
          toast.error(err.response.data.message || "لا يمكن حذف هذه الكلية", {
            id: deleteToastId,
          });
        } else if (err.response?.data?.error) {
          toast.error(err.response.data.error || "فشل في حذف الكلية", {
            id: deleteToastId,
          });
        } else {
          toast.error(err.response?.data?.message || "فشل في حذف الكلية", {
            id: deleteToastId,
          });
        }
      }
    } catch (error) {
      toast.error("حدث خطأ غير متوقع");
      console.error("خطأ غير متوقع:", error);
    }
  };

  if (loading && colleges.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">جاري تحميل الكليات...</span>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة الكليات</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <FiPlus /> إضافة كلية جديدة
        </button>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded flex items-center">
          <FiInfo className="mr-2" /> {errorMsg}
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                #
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                اسم الكلية
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                الجامعة
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {colleges.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  لا توجد كليات. قم بإضافة أول كلية.
                </td>
              </tr>
            ) : (
              colleges.map((college, index) => (
                <tr key={college.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {college.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                      {getUniversityName(
                        college.universitie_id || college.university_id
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-3">
                    <button
                      onClick={() => {
                        setShowEditModal(college.id);
                        setForm({
                          name: college.name,
                        });
                      }}
                      className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 inline-flex"
                    >
                      <FiEdit size={14} /> تعديل
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteId(college.id);
                      }}
                      className="text-red-600 hover:text-red-800 hover:underline flex items-center gap-1 inline-flex"
                    >
                      <FiTrash size={14} /> حذف
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* نافذة الإضافة / التعديل */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {showAddModal ? "إضافة كلية جديدة" : "تعديل الكلية"}
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم الكلية <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="أدخل اسم الكلية"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={showAddModal ? handleAdd : handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {showAddModal ? "إضافة الكلية" : "تحديث الكلية"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة تأكيد الحذف */}
      {showDeleteId && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              تأكيد الحذف
            </h3>
            <p className="mb-4 text-gray-600">
              هل أنت متأكد أنك تريد حذف هذه الكلية؟ هذا الإجراء لا يمكن التراجع
              عنه.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteId(null)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
              >
                <FiTrash size={14} /> حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
