// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useUser } from "../context/UserContext";
// import toast from "react-hot-toast";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const { login } = useUser(); // ✅ نستدعي login التي تقبل token

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast.error("يرجى إدخال البريد الإلكتروني وكلمة المرور");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok && data.data.token) {
//         const token = data.data.token;

//         // ✅ حفظ البيانات في التخزين المحلي
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(data.data.user));

//         // ✅ استدعاء login مع التوكن
//         login(token);

//         toast.success("تم تسجيل الدخول بنجاح!");

//         setTimeout(() => {
//           router.push("/");
//         }, 1000);
//       } else {
//         toast.error(data.message || "فشل تسجيل الدخول. حاول مرة أخرى.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("حدث خطأ ما. حاول مرة أخرى.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-[#0A2647] px-4"
//       dir="rtl"
//     >
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-right">
//         <h2 className="text-2xl font-bold mb-6 text-center text-[#0A2647]">
//           تسجيل الدخول إلى حسابك
//         </h2>

//         <form onSubmit={handleLogin} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               البريد الإلكتروني
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               كلمة المرور
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
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
//             {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
//           </button>
//         </form>

//         <p className="text-sm text-center mt-4">
//           ليس لديك حساب؟{" "}
//           <a href="/signup" className="text-blue-600 hover:underline">
//             أنشئ حساب الآن
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";
import CryptoJS from "crypto-js";

const secretKey = "my_secret_key_123";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        const token = data.token;
        const user = data.user;
          console.log(user)
        // ✅ تشفير بيانات المستخدم وتخزينها
        const encryptedUser = CryptoJS.AES.encrypt(
          JSON.stringify(user),
          secretKey
        ).toString();
        localStorage.setItem("token", token);
        localStorage.setItem("user", encryptedUser);

        login(token);
        toast.success("تم تسجيل الدخول بنجاح!");

        // ✅ توجيه المستخدم بناءً على دوره وصلاحياته
        if (user.role_id === 5) {
          const isTeamLeader = user.students[0]?.isTemLeder === 1;
          if (isTeamLeader) {
            router.push("/upload");
          } else {
            router.push("/");
          }
        } else if (user.role_id === 2) {
          router.push("/dashboard/admin");
        } else if (user.role_id === 1) {
          router.push("/dashboard/super-admin");
        } else if (user.role_id === 3) {
          router.push("/dashboard/library");
        } else {
           router.push("/");
        }
      } else {
        toast.error(data.message || "فشل تسجيل الدخول. حاول مرة أخرى.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("حدث خطأ ما. حاول مرة أخرى.");
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
          تسجيل الدخول إلى حسابك
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
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
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          ليس لديك حساب؟{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            أنشئ حساب الآن
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
