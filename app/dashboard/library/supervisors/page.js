"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";

const API = "http://127.0.0.1:8000/api/librarayStaff/supervisors";

export default function SupervisorManagementPage() {
  const [supervisors, setSupervisors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    supervisorDgree: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchSupervisors = async () => {
    try {
      const res = await axios.get(API, {
        headers: getAuthHeaders(),
      });
      setSupervisors(res.data.data || []);
    } catch (err) {
      console.error("فشل في جلب المشرفين:", err);
    }
  };

  useEffect(() => {
    fetchSupervisors();
  }, []);

  const handleAdd = async () => {
    if (!form.name || !form.supervisorDgree) return;
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("supervisorDgree", form.supervisorDgree);

      await axios.post(API, formData, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });

      resetForm();
      fetchSupervisors();
    } catch (err) {
      console.error("خطأ في الإضافة:", err);
    }
  };

  const handleUpdate = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.password_confirmation
    )
      return;

    try {
      await axios.put(
        `${API}/${editId}`,
        {
          name: form.name,
          email: form.email,
          password: form.password,
          password_confirmation: form.password_confirmation,
          supervisorDgree: form.supervisorDgree,
        },
        {
          headers: getAuthHeaders(),
        }
      );

      resetForm();
      fetchSupervisors();
    } catch (err) {
      console.error("خطأ في التحديث:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("هل أنت متأكد من حذف هذا المشرف؟");
    if (!confirm) return;

    try {
      await axios.delete(`${API}/${id}`, {
        headers: getAuthHeaders(),
      });
      fetchSupervisors();
    } catch (err) {
      console.error("خطأ في الحذف:", err);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      supervisorDgree: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
    setIsEditing(false);
    setEditId(null);
    setShowForm(false);
  };

  const openEdit = (sup) => {
    setForm({
      name: sup.user.name,
      email: sup.user.email,
      password: "",
      password_confirmation: "",
      supervisorDgree: sup.supervisorDgree,
    });
    setIsEditing(true);
    setEditId(sup.id);
    setShowForm(true);
  };

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <h2 className="text-2xl font-bold text-gray-800">👨‍🏫 إدارة المشرفين</h2>

      {showForm && (
        <div className="bg-white shadow rounded p-6 space-y-4">
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <FiPlus />
            {isEditing ? "تعديل بيانات المشرف" : "إضافة مشرف جديد"}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {isEditing ? (
              <>
                <input
                  type="text"
                  placeholder="اسم المشرف"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="password"
                  placeholder="تأكيد كلمة المرور"
                  value={form.password_confirmation}
                  onChange={(e) =>
                    setForm({ ...form, password_confirmation: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="المؤهل العلمي"
                  value={form.supervisorDgree}
                  onChange={(e) =>
                    setForm({ ...form, supervisorDgree: e.target.value })
                  }
                  className="border p-2 rounded"
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="اسم المشرف"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="المؤهل العلمي"
                  value={form.supervisorDgree}
                  onChange={(e) =>
                    setForm({ ...form, supervisorDgree: e.target.value })
                  }
                  className="border p-2 rounded"
                />
              </>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={isEditing ? handleUpdate : handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
            >
              {isEditing ? "تحديث المشرف" : "إضافة المشرف"}
            </button>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:underline"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded p-4 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">📋 قائمة المشرفين</h3>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          >
            <FiPlus /> إضافة مشرف
          </button>
        </div>

        {supervisors.length === 0 ? (
          <p className="text-gray-500">لا يوجد مشرفين حالياً.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-right">الاسم</th>
                <th className="px-4 py-2 text-right">البريد الإلكتروني</th>
                <th className="px-4 py-2 text-right">كلمة المرور</th>
                <th className="px-4 py-2 text-right">الكلية</th>
                <th className="px-4 py-2 text-right">المؤهل العلمي</th>
                <th className="px-4 py-2 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {supervisors.map((sup) => (
                <tr key={sup.id} className="border-t">
                  <td className="px-4 py-2">{sup.user?.name}</td>
                  <td className="px-4 py-2">{sup.user?.email}</td>
                  <td className="px-4 py-2">••••••••</td>
                  <td className="px-4 py-2">
                    {sup.college?.name || "غير محددة"}
                  </td>
                  <td className="px-4 py-2">{sup.supervisorDgree}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => openEdit(sup)}
                      className="text-blue-600 hover:underline"
                      title="تعديل"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(sup.id)}
                      className="text-red-600 hover:underline"
                      title="حذف"
                    >
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
