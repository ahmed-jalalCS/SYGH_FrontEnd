"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiClock,
  FiBook,
  FiUsers,
  FiUserCheck,
  FiDatabase,
  FiActivity,
  FiRefreshCw,
  FiTrendingUp,
} from "react-icons/fi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const API_BASE = "http://127.0.0.1:8000/api";

export default function LibraryStaffHomePage() {
  const [stats, setStats] = useState({
    projects: { total: 0, by_department: [] },
    students: { total: 0, by_department: [] },
    supervisors: { total: 0, by_department: [] },
    departments: { total: 0, departments: [] },
    recent_activity: { latest_projects: [] },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE}/librarayStaff/dashboard/stats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("فشل في جلب الإحصائيات:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen" dir="rtl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="mr-3 text-gray-700 text-lg">جاري تحميل البيانات...</span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          لوحة تحكم موظف المكتبة
        </h2>
        <button
          onClick={fetchStats}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FiRefreshCw className="animate-pulse" /> تحديث البيانات
        </button>
      </div>

      {/* البطاقات الرئيسية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* المشاريع */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold opacity-80">عدد المشاريع</p>
              <h3 className="text-3xl font-bold mt-1">{stats.projects.total}</h3>
            </div>
            <div className="bg-blue-400 bg-opacity-30 p-3 rounded-full">
              <FiBook className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 text-xs">
            <span className="flex items-center text-green-200">
              <FiTrendingUp className="ml-1" /> موزعة على{" "}
              {stats.projects.by_department.length} قسم
            </span>
          </div>
        </div>

        {/* الطلاب */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold opacity-80">عدد الطلاب</p>
              <h3 className="text-3xl font-bold mt-1">{stats.students.total}</h3>
            </div>
            <div className="bg-green-400 bg-opacity-30 p-3 rounded-full">
              <FiUsers className="text-2xl" />
            </div>
          </div>
          <p className="mt-4 text-xs text-green-200 flex items-center">
            <FiActivity className="ml-1" />
            مشاركين في المشاريع
          </p>
        </div>

        {/* المشرفين */}
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-lg shadow-xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold opacity-80">عدد المشرفين</p>
              <h3 className="text-3xl font-bold mt-1">
                {stats.supervisors.total}
              </h3>
            </div>
            <div className="bg-yellow-400 bg-opacity-30 p-3 rounded-full">
              <FiUserCheck className="text-2xl" />
            </div>
          </div>
          <p className="mt-4 text-xs text-green-200 flex items-center">
            <FiActivity className="ml-1" />
            مشرفين على المشاريع
          </p>
        </div>

        {/* الأقسام */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg shadow-xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold opacity-80">عدد الأقسام</p>
              <h3 className="text-3xl font-bold mt-1">
                {stats.departments.total}
              </h3>
            </div>
            <div className="bg-purple-400 bg-opacity-30 p-3 rounded-full">
              <FiDatabase className="text-2xl" />
            </div>
          </div>
          <p className="mt-4 text-xs text-green-200 flex items-center">
            <FiActivity className="ml-1" />
            أقسام نشطة
          </p>
        </div>
      </div>

      {/* المخططات الإحصائية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FiBook className="ml-2 text-blue-500" /> المشاريع حسب الأقسام
          </h3>
          <div className="flex flex-col space-y-4">
            {stats.projects.by_department.map((dept, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{dept.department}</span>
                  <span className="text-sm">{dept.count} مشروع</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(dept.count / stats.projects.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FiUsers className="ml-2 text-green-500" /> الطلاب حسب الأقسام
          </h3>
          <div className="flex flex-col space-y-4">
            {stats.students.by_department.map((dept, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{dept.department}</span>
                  <span className="text-sm">{dept.count} طالب</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${(dept.count / stats.students.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* أحدث المشاريع */}
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FiActivity className="ml-2 text-blue-500" />
          أحدث المشاريع المضافة
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-right">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  المعرف
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  اسم المشروع
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  المشرف
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  القسم
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  تاريخ الإضافة
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recent_activity.latest_projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{project.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">
                    {project.title}
                  </td>
                  <td className="px-6 py-4 text-sm">{project.supervisor}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {project.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 flex items-center gap-1">
                    <FiClock />
                    {new Date(project.created_at).toLocaleDateString("ar-EG", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
