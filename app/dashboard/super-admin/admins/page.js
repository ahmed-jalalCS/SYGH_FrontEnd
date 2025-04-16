"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const API = "http://127.0.0.1:8000/api/superadmin";

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    universityId: "",
  });
  const [mode, setMode] = useState(null); // 'add' or 'edit'
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API}/admins`, {
        headers: getAuthHeaders(),
      });
      setAdmins(res.data.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "فشل في جلب المدراء");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUniversities = async () => {
    try {
      const res = await axios.get(`${API}/universities/statices`, {
        headers: getAuthHeaders(),
      });
      setUniversities(res.data.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "فشل في جلب الجامعات");
    }
  };

  useEffect(() => {
    fetchAdmins();
    fetchUniversities();
  }, []);

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.email ||
      (mode === "add" && (!form.universityId || !form.password))
    ) {
      toast.error("جميع الحقول مطلوبة");
      return;
    }

    setIsLoading(true);
    try {
      if (mode === "edit") {
        await axios.put(
          `${API}/admin/${editId}`,
          {
            name: form.name,
            email: form.email,
            password: form.password || undefined,
          },
          { headers: getAuthHeaders() }
        );
        toast.success("تم تحديث المدير بنجاح");
      } else {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("password_confirmation", form.password);

        await axios.post(`${API}/admin/${form.universityId}`, formData, {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("تمت إضافة المدير بنجاح");
      }
      setForm({ name: "", email: "", password: "", universityId: "" });
      setEditId(null);
      setMode(null);
      setError("");
      fetchAdmins();
      fetchUniversities();
    } catch (err) {
      toast.error(err?.response?.data?.message || "حدث خطأ ما");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`${API}/admin/${deleteId}`, {
        headers: getAuthHeaders(),
      });
      setShowDeleteModal(false);
      toast.success("تم حذف المدير بنجاح");
      fetchAdmins();
      fetchUniversities();
    } catch (err) {
      toast.error(err?.response?.data?.message || "فشل في الحذف");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div dir="rtl">
      <Toaster position="top-left" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة المدراء</h2>
        <button
          onClick={() => {
            setMode("add");
            setForm({ name: "", email: "", password: "", universityId: "" });
            setError("");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + إضافة مدير
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-right">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">الاسم</th>
              <th className="px-4 py-2">البريد الإلكتروني</th>
              <th className="px-4 py-2">الجامعة</th>
              <th className="px-4 py-2 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={admin.id} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{admin.name}</td>
                <td className="px-4 py-2">{admin.email}</td>
                <td className="px-4 py-2">{admin.university_name || "-"}</td>
                <td className="px-4 py-2 text-center space-x-3">
                  <button
                    onClick={() => {
                      setForm({
                        name: admin.name,
                        email: admin.email,
                        password: "",
                        universityId: "",
                      });
                      setEditId(admin.id);
                      setMode("edit");
                      setError("");
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => confirmDelete(admin.id)}
                    className="text-red-600 hover:underline"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <div className="p-4 text-center">جارٍ التحميل...</div>}
      </div>

      {mode && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {mode === "edit" ? "تعديل بيانات المدير" : "إضافة مدير جديد"}
            </h3>

            <input
              type="text"
              placeholder="الاسم"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mb-3 border p-2 rounded"
            />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mb-3 border p-2 rounded"
            />

            <input
              type="password"
              placeholder="كلمة المرور"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full mb-3 border p-2 rounded"
            />

            {mode === "add" && (
              <select
                value={form.universityId}
                onChange={(e) =>
                  setForm({ ...form, universityId: e.target.value })
                }
                className="w-full mb-4 border p-2 rounded"
              >
                <option value="">اختر الجامعة</option>
                {universities.map((uni) => (
                  <option key={uni.id} value={uni.id}>
                    {uni.name}
                  </option>
                ))}
              </select>
            )}

            {error && <p className="text-red-600 mb-3">{error}</p>}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setMode(null);
                  setForm({
                    name: "",
                    email: "",
                    password: "",
                    universityId: "",
                  });
                }}
                className="text-gray-600"
              >
                إلغاء
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {mode === "edit" ? "تحديث" : "إضافة"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-4">تأكيد الحذف</h3>
            <p className="mb-4">هل أنت متأكد من حذف هذا المدير؟</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded border border-gray-400"
              >
                إلغاء
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
