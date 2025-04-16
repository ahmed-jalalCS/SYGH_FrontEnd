"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const API = "http://127.0.0.1:8000/api/librarayStaff/projects";

function ProjectsManagementPage() {
  const [projects, setProjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    department_id: "",
    supervisor_id: "",
    projectYear: "",
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(API, { headers: getAuthHeaders() });
      setProjects(res.data.data || []);
    } catch (err) {
      console.error("حدث خطأ أثناء جلب المشاريع:", err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/librarayStaff/departments",
        {
          headers: getAuthHeaders(),
        }
      );
      const depts = res.data.data?.[0]?.college?.department || [];
      setDepartments(depts);
    } catch (err) {
      console.error("خطأ في تحميل الأقسام:", err);
    }
  };

  const fetchSupervisors = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/librarayStaff/supervisors",
        {
          headers: getAuthHeaders(),
        }
      );
      setSupervisors(res.data.data || []);
    } catch (err) {
      console.error("خطأ في تحميل المشرفين:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchDepartments();
    fetchSupervisors();
  }, []);

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("department_id", form.department_id);
      formData.append("supervisor_id", form.supervisor_id);
      formData.append("projectYear", form.projectYear);

      await axios.post(API, formData, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });

      resetForm();
      setTimeout(fetchProjects, 300);
    } catch (err) {
      console.error("فشل الإضافة:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("title", form.title);
      formData.append("department_id", form.department_id);
      formData.append("supervisor_id", form.supervisor_id);
      formData.append("projectYear", form.projectYear);

      await axios.post(`${API}/${editing}`, formData, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });

      resetForm();
      fetchProjects();
    } catch (err) {
      console.error("فشل التحديث:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا المشروع؟")) return;
    try {
      await axios.delete(`${API}/${id}`, {
        headers: getAuthHeaders(),
      });
      fetchProjects();
    } catch (err) {
      console.error("فشل الحذف:", err);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      department_id: "",
      supervisor_id: "",
      projectYear: "",
    });
    setEditing(null);
  };

  const openEdit = (project) => {
    setForm({
      title: project.title,
      department_id:
        departments.find((d) => d.name === project.department_name)?.id || "",
      supervisor_id:
        supervisors.find((s) => s.user?.name === project.supervisor_name)?.id ||
        "",
      projectYear: project.projectYear,
    });
    setEditing(project.id);
  };

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <h2 className="text-2xl font-bold text-gray-800">📁 إدارة المشاريع</h2>

      {/* النموذج */}
      <div className="bg-white shadow rounded p-6 space-y-4">
        <div className="flex items-center gap-2 text-green-600 font-semibold">
          <FiPlus />
          {editing ? "تعديل مشروع" : "إضافة مشروع جديد"}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="عنوان المشروع"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2 rounded"
          />

          <select
            value={form.supervisor_id}
            onChange={(e) =>
              setForm({ ...form, supervisor_id: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option value="">اختر المشرف</option>
            {supervisors.map((s) => (
              <option key={s.id} value={s.id}>
                {s.user?.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={form.projectYear}
            onChange={(e) => setForm({ ...form, projectYear: e.target.value })}
            className="border p-2 rounded"
          />

          <select
            value={form.department_id}
            onChange={(e) =>
              setForm({ ...form, department_id: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option value="">اختر القسم</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <button
            onClick={editing ? handleUpdate : handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            {editing ? "تحديث المشروع" : "إضافة المشروع"}
          </button>
          <button onClick={resetForm} className="text-gray-500 hover:underline">
            إلغاء
          </button>
        </div>
      </div>

      {/* الجدول */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-right">اسم المشروع</th>
              <th className="px-4 py-2 text-right">القسم</th>
              <th className="px-4 py-2 text-right">المشرف</th>
              <th className="px-4 py-2 text-right">الحالة</th>
              <th className="px-4 py-2 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{project.title}</td>
                <td className="px-4 py-2">
                  {project.department_name ||
                    departments.find((d) => d.id == project.department_id)
                      ?.name ||
                    "—"}
                </td>
                <td className="px-4 py-2">
                  {project.supervisor_name ||
                    supervisors.find((s) => s.id == project.supervisor_id)?.user
                      ?.name ||
                    "—"}
                </td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                    قيد الانتظار
                  </span>
                </td>
                <td className="px-4 py-2 text-center space-x-3">
                  <button
                    onClick={() => openEdit(project)}
                    className="text-blue-600 hover:text-blue-800"
                    title="تعديل"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-600 hover:text-red-800"
                    title="حذف"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Page() {
  return <ProjectsManagementPage />;
}
