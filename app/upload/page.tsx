// "use client";

// import { useState } from "react";

// const UploadProjectForm = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     videoUrl: "",
//     document: null,
//   });
//   const [status, setStatus] = useState({
//     loading: false,
//     message: "",
//     success: null,
//   });
// localStorage.setItem(
//   "token",
//   "1|5nCpv3TGAh1RUkHl6Qv6rXqohAbOgOkgQ6OMsgqR1429c320"
// );
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setFormData((prev) => ({ ...prev, document: file }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus({ loading: true, message: "", success: null });

//     const token = localStorage.getItem("token");
//     if (!token) {
//       setStatus({
//         loading: false,
//         message: "Authentication token missing.",
//         success: false,
//       });
//       return;
//     }

//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("description", formData.description);
//     if (formData.videoUrl) data.append("videoUrl", formData.videoUrl);
//     if (formData.document) data.append("document", formData.document);

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/project", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: data,
//       });

//       const result = await response.json();
//       if (!response.ok)
//         throw new Error(result.message || "Failed to update project.");

//       setStatus({ loading: false, message: result.message, success: true });
//     } catch (err: any) {
//       setStatus({ loading: false, message: err.message, success: false });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Update Project
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Project Title *
//             </label>
//             <input
//               type="text"
//               name="title"
//               required
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <p className="text-sm text-gray-400 mt-1">
//               Used to locate the project to update.
//             </p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description *
//             </label>
//             <textarea
//               name="description"
//               required
//               value={formData.description}
//               onChange={handleChange}
//               rows={5}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Video URL
//             </label>
//             <input
//               type="url"
//               name="videoUrl"
//               value={formData.videoUrl}
//               onChange={handleChange}
//               placeholder="https://example.com/video"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Project Document
//             </label>
//             <input
//               type="file"
//               accept=".pdf,.doc,.docx"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-100 file:text-blue-700 file:rounded-lg file:cursor-pointer"
//             />
//             <p className="text-sm text-gray-400 mt-1">
//               Accepted: PDF, DOC, DOCX (Max 10MB)
//             </p>
//           </div>

//           <button
//             type="submit"
//             disabled={status.loading}
//             className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
//           >
//             {status.loading ? "Updating..." : "Update Project"}
//           </button>

//           {status.message && (
//             <p
//               className={`text-sm mt-2 ${
//                 status.success ? "text-green-600" : "text-red-500"
//               } text-center`}
//             >
//               {status.message}
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UploadProjectForm;
"use client";

import { useState } from "react";

const UploadProjectForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    document: null,
  });

  const [status, setStatus] = useState({
    loading: false,
    message: "",
    success: null,
  });

  localStorage.setItem(
    "token",
    "1|5nCpv3TGAh1RUkHl6Qv6rXqohAbOgOkgQ6OMsgqR1429c320"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, document: file }));
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
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.videoUrl) data.append("videoUrl", formData.videoUrl);
    if (formData.document) data.append("document", formData.document);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/project", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "فشل في تحديث المشروع.");

      setStatus({ loading: false, message: result.message, success: true });
    } catch (err: any) {
      setStatus({ loading: false, message: err.message, success: false });
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8 text-right">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          تحديث معلومات المشروع
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              عنوان المشروع *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-400 mt-1">
              يُستخدم لتحديد المشروع المراد تعديله.
            </p>
          </div>

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
              مستند المشروع
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
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
            {status.loading ? "جاري التحديث..." : "تحديث المشروع"}
          </button>

          {status.message && (
            <p
              className={`text-sm mt-2 ${
                status.success ? "text-green-600" : "text-red-500"
              } text-center`}
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
