"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash, FiPlus, FiInfo, FiUser, FiChevronDown } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

const API_BASE = "http://127.0.0.1:8000/api";

export default function LibraryStaffPage() {
  const [staff, setStaff] = useState(null);
  const [college, setCollege] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    college_id: ""
  });
  const [mode, setMode] = useState(null); // 'add' | 'edit'
  const [warning, setWarning] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [staffList, setStaffList] = useState([]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  useEffect(() => {
    fetchCollegeData();
  }, []);

  const fetchCollegeData = async () => {
    try {
      setLoading(true);
      setWarning("");
      
      const collegesRes = await axios.get(`${API_BASE}/admin/colleges`, {
        headers: getAuthHeaders(),
      });
      
      if (collegesRes.data.data && collegesRes.data.data.length > 0) {
        const collegesData = collegesRes.data.data;
        setColleges(collegesData);

        const defaultCollege = collegesData[0];
        setCollege(defaultCollege);

        await fetchLibraryStaff();
      } else {
        setWarning("لا توجد كليات مسجلة لهذا المدير");
        setLoading(false);
      }
    } catch (err) {
      console.error("فشل في جلب بيانات الكليات:", err);
      setWarning(err.response?.data?.message || "فشل في تحميل بيانات الكليات");
      toast.error("فشل في تحميل بيانات الكليات");
      setLoading(false);
    }
  };

  const fetchLibraryStaff = async () => {
    try {
      const response = await axios.get(`${API_BASE}/admin/libraraystaffs`, {
        headers: getAuthHeaders()
      });

      if (response.data && response.data.data) {
        const staffData = response.data.data;

        if (Array.isArray(staffData) && staffData.length > 0) {
          const processedStaffData = staffData.map(staff => {
            return {
              id: staff.id,
              name: staff.user?.name || "غير معروف",
              email: staff.user?.email || "لا يوجد بريد",
              user_id: staff.user_id,
              college_id: staff.college_id,
              created_at: staff.created_at,
              updated_at: staff.updated_at,
              raw_data: staff
            };
          });

          setStaffList(processedStaffData);

          if (college) {
            const collegeStaff = processedStaffData.find(s => s.college_id === college.id);
            if (collegeStaff) {
              setStaff(collegeStaff);
            } else {
              setStaff(processedStaffData[0]);

              const staffCollege = colleges.find(c => c.id === processedStaffData[0].college_id);
              if (staffCollege) {
                setCollege(staffCollege);
              }
            }
          } else {
            setStaff(processedStaffData[0]);
          }
        } else {
          setStaff(null);
          setStaffList([]);
        }
      } else {
        setStaff(null);
        setStaffList([]);
      }

      setLoading(false);
    } catch (err) {
      console.error("فشل في جلب موظفي المكتبة:", err);
      setWarning(err.response?.data?.message || "فشل في تحميل بيانات موظفي المكتبة");
      toast.error("فشل في تحميل بيانات موظفي المكتبة");
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!form.name || !form.name.trim()) {
      toast.error("الاسم مطلوب");
      return false;
    }

    if (!form.email || !form.email.trim()) {
      toast.error("البريد الإلكتروني مطلوب");
      return false;
    }

    if (mode === 'add') {
      if (!form.college_id) {
        toast.error("يرجى اختيار كلية");
        return false;
      }

      if (!form.password || form.password.length < 10) {
        toast.error("يجب أن تكون كلمة المرور على الأقل 10 أحرف");
        return false;
      }

      if (form.password !== form.password_confirmation) {
        toast.error("كلمتا المرور غير متطابقتين");
        return false;
      }
    }

    return true;
  };

  const handleAdd = async () => {
    if (!validateForm()) return;

    const addToastId = toast.loading("جاري إضافة موظف مكتبة...");

    try {
      const selectedCollegeId = form.college_id;
      if (!selectedCollegeId) {
        toast.error("لم يتم اختيار كلية", { id: addToastId });
        return;
      }

      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("email", form.email.trim());
      formData.append("password", form.password);
      formData.append("password_confirmation", form.password_confirmation);

      const response = await axios.post(
        `${API_BASE}/admin/colleges/${selectedCollegeId}/addlibraraystaff`,
        formData,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // ستُكمل هذه العملية في الجزء التالي...
      if (response.data.success) {
        toast.success(response.data.message || "تمت إضافة موظف المكتبة بنجاح", { id: addToastId });

        const selectedCollege = colleges.find(c => c.id == selectedCollegeId);

        if (response.data.data) {
          const newStaff = {
            id: response.data.data.id,
            name: form.name,
            email: form.email,
            user_id: response.data.data.user_id,
            college_id: selectedCollegeId,
            college_name: selectedCollege?.name || "كلية غير معروفة"
          };

          setStaff(newStaff);
          setStaffList(prev => [...prev, newStaff]);

          if (selectedCollege) {
            setCollege(selectedCollege);
          }
        }

        resetForm();
      } else {
        toast.error(response.data.message || "فشل في إضافة موظف المكتبة", { id: addToastId });
      }
    } catch (err) {
      console.error("خطأ أثناء الإضافة:", err);
      if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat();
        toast.error(errorMessages[0] || "خطأ في التحقق من المدخلات", { id: addToastId });
      } else if (err.response?.data?.error) {
        toast.error(err.response.data.error, { id: addToastId });
      } else {
        toast.error(err.response?.data?.message || "فشل في إضافة موظف المكتبة", { id: addToastId });
      }
    }
  };

  const handleUpdate = async () => {
    if (!form.name || !form.name.trim()) {
      toast.error("الاسم مطلوب");
      return;
    }

    const updateToastId = toast.loading("جاري تحديث موظف المكتبة...");

    try {
      if (!staff || !staff.id) {
        toast.error("لم يتم تحديد موظف", { id: updateToastId });
        return;
      }

      const userId = staff.user_id;

      if (!userId) {
        toast.error("معرف المستخدم مفقود", { id: updateToastId });
        console.error("معرف المستخدم مفقود في كائن الموظف:", staff);
        return;
      }

      console.log("تحديث الموظف بمعرف المستخدم:", userId);

      const formData = new FormData();
      formData.append("name", form.name.trim());

      if (form.password) {
        formData.append("password", form.password);
      }

      formData.append("_method", "PUT");

      const response = await axios.post(
        `${API_BASE}/admin/colleges/${userId}/updatelibraraystaff`,
        formData,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("استجابة التحديث:", response.data);

      if (response.data.success) {
        toast.success(response.data.message || "تم تحديث موظف المكتبة بنجاح", { id: updateToastId });

        const updatedStaff = {
          ...staff,
          name: form.name
        };

        setStaff(updatedStaff);

        setStaffList(prev =>
          prev.map(s => s.id === staff.id ? updatedStaff : s)
        );

        resetForm();
      } else {
        toast.error(response.data.message || "فشل في تحديث موظف المكتبة", { id: updateToastId });
      }
    } catch (err) {
      console.error("خطأ في التحديث:", err);
      if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat();
        toast.error(errorMessages[0] || "خطأ في التحقق من المدخلات", { id: updateToastId });
      } else if (err.response?.data?.error) {
        toast.error(err.response.data.error, { id: updateToastId });
      } else {
        toast.error(err.response?.data?.message || "فشل في تحديث موظف المكتبة", { id: updateToastId });
      }
    }
  };

  const handleDelete = async () => {
    if (!staff || !staff.id) {
      toast.error("لا يوجد موظف مكتبة للحذف");
      return;
    }

    const deleteToastId = toast.loading("جاري حذف موظف المكتبة...");

    try {
      console.log("محاولة حذف الموظف:", staff);

      const userId = staff.id;

      if (!userId) {
        toast.error("معرف المستخدم مفقود", { id: deleteToastId });
        console.error("معرف المستخدم مفقود في كائن الموظف:", staff);
        return;
      }

      console.log("حذف الموظف بمعرف المستخدم:", userId);

      const response = await axios.delete(
        `${API_BASE}/admin/colleges/${userId}/deletelibraraystaff`,
        {
          headers: getAuthHeaders(),
        }
      );

      console.log("استجابة الحذف:", response.data);

      if (response.data.success) {
        toast.success(response.data.message || "تم حذف موظف المكتبة بنجاح", { id: deleteToastId });

        setStaffList(prev => prev.filter(s => s.id !== staff.id));

        if (staffList.length > 1) {
          const remainingStaff = staffList.filter(s => s.id !== staff.id);
          setStaff(remainingStaff[0]);
        } else {
          setStaff(null);
        }

        setShowDeleteConfirm(false);
      } else {
        toast.error(response.data.message || "فشل في حذف موظف المكتبة", { id: deleteToastId });
      }
    } catch (err) {
      console.error("خطأ في الحذف:", err);
      toast.error(err.response?.data?.message || "فشل في حذف موظف المكتبة", { id: deleteToastId });
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      college_id: college?.id || ""
    });
    setMode(null);
    setWarning("");
  };
  // دالة اختيار موظف مكتبة معين
  const selectStaff = (staffMember) => {
    setStaff(staffMember);
  
    if (staffMember && staffMember.college_id) {
      const staffCollege = colleges.find(c => c.id === staffMember.college_id);
      if (staffCollege) {
        setCollege(staffCollege);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">جاري التحميل...</span>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
    
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة موظفي المكتبة</h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setForm({
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                college_id: college?.id || ""
              });
              setMode("add");
              setWarning("");
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
          >
            <FiPlus /> إضافة موظف مكتبة
          </button>
        </div>
      </div>

      {warning && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded flex items-center">
          <FiInfo className="mr-2" /> {warning}
        </div>
      )}

      {colleges.length === 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded flex items-center">
          <FiInfo className="mr-2" /> لا توجد كليات مضافة، يجب إضافة كلية قبل إدارة موظفي المكتبة.
        </div>
      )}

      {staffList.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">#</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">الاسم</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">البريد الإلكتروني</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">الكلية</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {staffList.map((staffMember, index) => (
                <tr key={staffMember.id} className={`hover:bg-gray-50 ${staff && staff.id === staffMember.id ? 'bg-blue-50' : ''}`}>
                  <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{staffMember.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{staffMember.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {colleges.find(c => c.id === staffMember.college_id)?.name || staffMember.college_name || "كلية غير معروفة"}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-3">
                    <button
                      onClick={() => {
                        selectStaff(staffMember);
                        setForm({
                          name: staffMember.name,
                          email: staffMember.email,
                          password: "",
                          password_confirmation: "",
                          college_id: staffMember.college_id || ""
                        });
                        setMode("edit");
                        setWarning("");
                      }}
                      className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 inline-flex"
                    >
                      <FiEdit size={14} /> تعديل
                    </button>
                    <button
                      onClick={() => {
                        selectStaff(staffMember);
                        setShowDeleteConfirm(true);
                      }}
                      className="text-red-600 hover:text-red-800 hover:underline flex items-center gap-1 inline-flex"
                    >
                      <FiTrash size={14} /> حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="flex flex-col items-center justify-center py-12">
            <FiUser className="text-gray-400 text-6xl mb-4" />
            <p className="text-gray-600 mb-4 text-lg">لا يوجد موظفو مكتبة.</p>
            <p className="text-gray-500 max-w-md mx-auto">
              يمكن لموظف المكتبة إدارة المشاريع والمشرفين والطلاب الخاصة بالكلية التي يعمل بها.
            </p>
          </div>
        </div>
      )}

      {/* نافذة الإضافة / التعديل */}
      {mode && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-95 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {mode === "add" ? "إضافة موظف مكتبة" : "تعديل موظف مكتبة"}
            </h3>

            {/* الاسم */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الاسم <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="أدخل الاسم الكامل"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* البريد الإلكتروني */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني {mode === "add" && <span className="text-red-500">*</span>}
              </label>
              <input
                type="email"
                placeholder="أدخل البريد الإلكتروني"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={mode === "edit"}
                className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${mode === "edit" ? "bg-gray-100" : ""
                  }`}
              />
              {mode === "edit" && (
                <p className="text-xs text-gray-500 mt-1">لا يمكن تعديل البريد الإلكتروني</p>
              )}
            </div>

            {/* اختيار الكلية */}
            {mode === "add" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الكلية <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={form.college_id}
                    onChange={(e) => setForm({ ...form, college_id: e.target.value })}
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8"
                  >
                    <option value="">اختر كلية</option>
                    {colleges.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <FiChevronDown className="text-gray-500" />
                  </div>
                </div>
              </div>
            )}

            {/* كلمة المرور */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                كلمة المرور {mode === "add" && <span className="text-red-500">*</span>}
              </label>
              <input
                type="password"
                placeholder={mode === "add" ? "أدخل كلمة المرور (10 أحرف على الأقل)" : "أدخل كلمة مرور جديدة (اختياري)"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {mode === "edit" && (
                <p className="text-xs text-gray-500 mt-1">اتركها فارغة للاحتفاظ بكلمة المرور الحالية</p>
              )}
            </div>

            {/* تأكيد كلمة المرور */}
            {mode === "add" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تأكيد كلمة المرور <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="تأكيد كلمة المرور"
                  value={form.password_confirmation}
                  onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* أزرار الحفظ والإلغاء */}
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={resetForm} className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50">
                إلغاء
              </button>
              <button
                onClick={mode === "add" ? handleAdd : handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {mode === "add" ? "إضافة" : "تحديث"}
              </button>
            </div>
          </div>
        </div>
      )}
  
      
      {/* نافذة تأكيد الحذف */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-95 p-6 rounded-lg shadow-xl w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">تأكيد الحذف</h3>
            <p className="mb-4 text-gray-600">
              هل أنت متأكد أنك تريد حذف هذا الموظف؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
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
