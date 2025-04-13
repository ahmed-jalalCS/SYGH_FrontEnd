// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";

// // const SignupPage = () => {
// //   const router = useRouter();

// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     password_confirmation: "",
// //   });

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSignup = (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (form.password !== form.password_confirmation) {
// //       alert("Passwords do not match!");
// //       return;
// //     }

// //     // Simulate successful signup
// //     console.log("User signed up with:", form);
// //     router.push("/login"); // or directly login if you implement auth
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-[#0A2647] px-4">
// //       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
// //         <h2 className="text-2xl font-bold mb-6 text-center text-[#0A2647]">
// //           Create an Account
// //         </h2>
// //         <form onSubmit={handleSignup} className="space-y-5">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Name
// //             </label>
// //             <input
// //               type="text"
// //               name="name"
// //               value={form.name}
// //               onChange={handleChange}
// //               placeholder="Your full name"
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Email
// //             </label>
// //             <input
// //               type="email"
// //               name="email"
// //               value={form.email}
// //               onChange={handleChange}
// //               placeholder="you@example.com"
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Password
// //             </label>
// //             <input
// //               type="password"
// //               name="password"
// //               value={form.password}
// //               onChange={handleChange}
// //               placeholder="••••••••"
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Confirm Password
// //             </label>
// //             <input
// //               type="password"
// //               name="password_confirmation"
// //               value={form.password_confirmation}
// //               onChange={handleChange}
// //               placeholder="••••••••"
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               required
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full bg-[#0A2647] text-white py-2 rounded-lg hover:bg-blue-900 transition"
// //           >
// //             Sign Up
// //           </button>
// //         </form>

// //         <p className="text-sm text-center mt-4">
// //           Already have an account?{" "}
// //           <a href="/login" className="text-blue-600 hover:underline">
// //             Login
// //           </a>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignupPage;
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const SignupPage = () => {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     password_confirmation: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (form.password !== form.password_confirmation) {
//       alert("Passwords do not match!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await response.json();

//       if (response.ok && data.data.token) {
//         // ✅ Save token to localStorage
//         localStorage.setItem("token", data.data.token);
//         localStorage.setItem("user", JSON.stringify(data.data.user));

        
//         router.push("/login"); // or go to /profile or /dashboard
//       } else {
//         alert(data.message || "Signup failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0A2647] px-4">
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-[#0A2647]">
//           Create an Account
//         </h2>

//         <form onSubmit={handleSignup} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="Your full name"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="you@example.com"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               placeholder="••••••••"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               name="password_confirmation"
//               value={form.password_confirmation}
//               onChange={handleChange}
//               placeholder="••••••••"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-[#0A2647] text-white py-2 rounded-lg transition ${
//               loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-900"
//             }`}
//           >
//             {loading ? "Signing up..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="text-sm text-center mt-4">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-600 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.password_confirmation) {
      alert("كلمتا المرور غير متطابقتين!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.data.token) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        router.push("/login");
      } else {
        alert(data.message || "فشل التسجيل. حاول مرة أخرى.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("حدث خطأ ما. يرجى المحاولة لاحقًا.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#0A2647] px-4"
      dir="rtl"
    >
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-right">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#0A2647]">
          إنشاء حساب جديد
        </h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الاسم الكامل
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="أدخل اسمك الكامل"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              كلمة المرور
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تأكيد كلمة المرور
            </label>
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#0A2647] text-white py-2 rounded-lg transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-900"
            }`}
          >
            {loading ? "جاري التسجيل..." : "تسجيل"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          لديك حساب بالفعل؟{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            تسجيل الدخول
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
