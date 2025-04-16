"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { 
  FiUsers, 
  FiBook, 
  FiLayout, 
  FiDatabase, 
  FiUserCheck,
  FiTrendingUp,
  FiActivity,
  FiCalendar,
  FiRefreshCw
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getDecryptedUser } from "@/utils/decryptUser";
export default function AdminHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };
  const router = useRouter();

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/dashboard/stats",
        { headers: getAuthHeaders() }
      );

      console.log(response.data)
      if (response.data.data) {
        setStats(response.data.data);
        console.log("data",response.data)
      } else {
        toast.error("فشل تحميل بيانات لوحة التحكم");
      }
    } catch (error) {
      console.error("Dashboard stats error:", error);
      toast.error("خطأ أثناء جلب إحصائيات لوحة التحكم");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-700">جاري تحميل بيانات لوحة التحكم...</span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">لوحة تحكم المشرف</h2>
        <button 
          onClick={fetchStats}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FiRefreshCw className="animate-pulse" /> تحديث البيانات
        </button>
      </div>

      {/* نظرة عامة على الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {/* بطاقة المشاريع */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-xl text-white transform hover:scale-105 transition-transform duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold opacity-80">المشاريع</p>
              <h3 className="text-3xl font-bold mt-1">{stats?.total_counts.projects || 0}</h3>
            </div>
            <div className="bg-blue-400 bg-opacity-30 p-3 rounded-full">
              <FiBook className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 text-xs">
            <span className="flex items-center text-green-200">
              <FiTrendingUp className="mr-1" /> {stats?.projects_stats.by_year?.[0]?.count || 0} في {stats?.projects_stats.by_year?.[0]?.year || 'العام الحالي'}
            </span>
          </div>
        </div>

        {/* بطاقة الطلاب */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-xl text-white transform hover:scale-105 transition-transform duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold opacity-80">الطلاب</p>
              <h3 className="text-3xl font-bold mt-1">{stats?.total_counts.students || 0}</h3>
            </div>
            <div className="bg-green-400 bg-opacity-30 p-3 rounded-full">
              <FiUsers className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 text-xs">
            <span className="flex items-center text-green-200">
              <FiActivity className="mr-1" /> موزعين على {stats?.students_stats.by_department?.length || 0} قسم
            </span>
          </div>
        </div>

        {/* بطاقة الكليات */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg shadow-xl text-white transform hover:scale-105 transition-transform duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold opacity-80">الكليات</p>
              <h3 className="text-3xl font-bold mt-1">{stats?.total_counts.colleges || 0}</h3>
            </div>
            <div className="bg-purple-400 bg-opacity-30 p-3 rounded-full">
              <FiLayout className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 text-xs">
            <span className="flex items-center text-green-200">
              <FiDatabase className="mr-1" /> تحتوي على {stats?.total_counts.departments || 0} قسم
            </span>
          </div>
        </div>

        {/* بطاقة الأقسام */}
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-lg shadow-xl text-white transform hover:scale-105 transition-transform duration-300">
          <div className="flex justify-between items-center">
          <div>
              <p className="text-sm font-semibold opacity-80">الأقسام</p>
              <h3 className="text-3xl font-bold mt-1">{stats?.total_counts.departments || 0}</h3>
            </div>
            <div className="bg-yellow-400 bg-opacity-30 p-3 rounded-full">
              <FiDatabase className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 text-xs">
            <span className="flex items-center text-green-200">
              <FiActivity className="mr-1" /> موزعة على {stats?.departments_stats.by_college?.length || 0} كلية
            </span>
          </div>
        </div>

        {/* بطاقة المشرفين */}
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-lg shadow-xl text-white transform hover:scale-105 transition-transform duration-300">
          <div className="flex justify-between items-center">
          <div>
              <p className="text-sm font-semibold opacity-80">المشرفون</p>
              <h3 className="text-3xl font-bold mt-1">{stats?.total_counts.supervisors || 0}</h3>
            </div>
            <div className="bg-red-400 bg-opacity-30 p-3 rounded-full">
              <FiUserCheck className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 text-xs">
            <span className="flex items-center text-green-200">
              <FiActivity className="mr-1" /> يشرفون على {stats?.total_counts.projects || 0} مشروع
            </span>
          </div>
        </div>
      </div>

      {/* قسم التوزيع */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* المشاريع حسب الأقسام */}
        <div className="bg-white p-6 rounded-lg shadow-xl transform hover:shadow-2xl transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FiBook className="mr-2 text-blue-500" /> المشاريع حسب الأقسام
          </h3>
          <div className="flex flex-col space-y-4">
            {stats?.projects_stats.by_department.map((dept, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{dept.department}</span>
                  <span className="text-sm font-medium text-gray-700">{dept.count} مشروع</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(dept.count / stats.projects_stats.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
{/* الطلاب حسب الأقسام */}
<div className="bg-white p-6 rounded-lg shadow-xl transform hover:shadow-2xl transition-all duration-300">
  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
    <FiUsers className="mr-2 text-green-500" /> الطلاب حسب الأقسام
  </h3>
  <div className="flex flex-col space-y-4">
    {stats?.students_stats.by_department.map((dept, index) => (
      <div key={index} className="flex flex-col">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{dept.department}</span>
          <span className="text-sm font-medium text-gray-700">{dept.count} طالب</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-green-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${(dept.count / stats.students_stats.total) * 100}%` }}
          ></div>
        </div>
      </div>
    ))}
  </div>
</div>
</div>

{/* المشاريع حسب السنوات */}
<div className="bg-white p-6 rounded-lg shadow-xl mt-8 transform hover:shadow-2xl transition-all duration-300">
  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
    <FiCalendar className="mr-2 text-indigo-500" /> المشاريع حسب السنوات
  </h3>
  <div className="flex items-end h-48 space-x-6 justify-center">
    {stats?.projects_stats.by_year.map((yearData, index) => (
      <div key={index} className="flex flex-col items-center">
        <div className="flex items-end h-40">
          <div 
            className="w-16 bg-indigo-500 rounded-t-lg transition-all duration-1000 ease-out flex items-center justify-center text-white font-bold"
            style={{ 
              height: `${(yearData.count / Math.max(...stats.projects_stats.by_year.map(y => y.count))) * 100}%`,
              minHeight: '20px'
            }}
          >
            {yearData.count}
          </div>
        </div>
        <div className="mt-2 text-sm font-medium text-gray-700">{yearData.year}</div>
      </div>
    ))}
  </div>
</div>

{/* المشاريع الحديثة */}
<div className="bg-white p-6 rounded-lg shadow-xl mt-8 transform hover:shadow-2xl transition-all duration-300">
  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
    <FiActivity className="mr-2 text-blue-500" /> المشاريع الحديثة
  </h3>
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">المعرف</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">عنوان المشروع</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">المشرف</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">القسم</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ الإنشاء</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {stats?.recent_activity.latest_projects.map((project) => (
          <tr key={project.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{project.title}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{project.supervisor}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                {project.department}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
              <div className="flex items-center">
                <FiCalendar className="mr-2 text-gray-400" />
                {new Date(project.created_at).toLocaleDateString('ar-EG', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

{/* ملخصات */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
  {/* ملخص المشاريع */}
  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md border border-blue-100 transform hover:shadow-xl hover:scale-105 transition-all duration-300">
    <div className="flex items-center mb-4">
      <div className="bg-blue-100 p-3 rounded-full mr-4">
        <FiBook className="text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">ملخص المشاريع</h3>
    </div>
    <p className="text-gray-600 mb-4">
      {stats?.total_counts.projects || 0} مشروع موزعة على {stats?.projects_stats.by_department.length || 0} قسم
    </p>
    <div className="grid grid-cols-2 gap-2 text-sm">
      {stats?.projects_stats.by_year.map((year, index) => (
        <div key={index} className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          <span>{year.year}: {year.count} مشروع</span>
        </div>
      ))}
    </div>
  </div>

  {/* ملخص الطلاب */}
  <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg shadow-md border border-green-100 transform hover:shadow-xl hover:scale-105 transition-all duration-300">
    <div className="flex items-center mb-4">
      <div className="bg-green-100 p-3 rounded-full mr-4">
        <FiUsers className="text-green-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">ملخص الطلاب</h3>
    </div>
    <p className="text-gray-600 mb-4">
      {stats?.total_counts.students || 0} طالب في {stats?.students_stats.by_department.length || 0} قسم
    </p>
    <div className="grid grid-cols-2 gap-2 text-sm">
      {stats?.students_stats.by_department.map((dept, index) => (
        <div key={index} className="flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          <span>{dept.department}: {dept.count} طالب</span>
        </div>
      ))}
    </div>
  </div>

  {/* ملخص المشرفين */}
  <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg shadow-md border border-red-100 transform hover:shadow-xl hover:scale-105 transition-all duration-300">
    <div className="flex items-center mb-4">
      <div className="bg-red-100 p-3 rounded-full mr-4">
        <FiUserCheck className="text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">ملخص المشرفين</h3>
    </div>
    <p className="text-gray-600 mb-4">
      {stats?.total_counts.supervisors || 0} مشرف يشرفون على المشاريع
    </p>
    <div className="grid grid-cols-1 gap-2 text-sm">
      {stats?.supervisors_stats.by_college.map((college, index) => (
        <div key={index} className="flex items-center">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
          <span>{college.college}: {college.count || 0} مشرف</span>
        </div>
      ))}
    </div>
  </div>
</div>

{/* نظرة عامة على النظام */}
<div className="bg-white p-6 rounded-lg shadow-xl mt-8 transform hover:shadow-2xl transition-all duration-300">
  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
    <FiDatabase className="mr-2 text-purple-500" /> نظرة عامة على النظام
  </h3>
  <p className="text-gray-600 mb-6 text-center max-w-3xl mx-auto leading-relaxed">
    تعرض هذه اللوحة نظرة شاملة على نظام إدارة المشاريع الأكاديمية. 
    مع وجود {stats?.total_counts.projects || 0} مشروع موزعة على {stats?.total_counts.departments || 0} قسم، 
    يدير النظام حاليًا {stats?.total_counts.students || 0} طالب و {stats?.total_counts.supervisors || 0} مشرف.
  </p>
  <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center transform hover:scale-110 transition-transform duration-300">
      <div className="text-blue-600 text-2xl font-bold">{stats?.total_counts.projects || 0}</div>
      <div className="text-gray-500 text-sm">المشاريع</div>
    </div>
    <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-center transform hover:scale-110 transition-transform duration-300">
      <div className="text-green-600 text-2xl font-bold">{stats?.total_counts.students || 0}</div>
      <div className="text-gray-500 text-sm">الطلاب</div>
    </div>
    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 text-center transform hover:scale-110 transition-transform duration-300">
      <div className="text-purple-600 text-2xl font-bold">{stats?.total_counts.colleges || 0}</div>
      <div className="text-gray-500 text-sm">الكليات</div>
    </div>
    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-center transform hover:scale-110 transition-transform duration-300">
      <div className="text-yellow-600 text-2xl font-bold">{stats?.total_counts.departments || 0}</div>
      <div className="text-gray-500 text-sm">الأقسام</div>
    </div>
    <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-center transform hover:scale-110 transition-transform duration-300">
      <div className="text-red-600 text-2xl font-bold">{stats?.total_counts.supervisors || 0}</div>
      <div className="text-gray-500 text-sm">المشرفون</div>
    </div>
  </div>
</div>
      

      </div> 
   
  );
} // نهاية دالة AdminHome