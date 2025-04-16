import "../globals.css";

export const metadata = {
  title: "لوحة تحكم SYGH",
  description: "مع شريط جانبي قابل للطي باستخدام Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
    
        <body className="font-raleway bg-gray-50 text-right">{children}</body>
      
    </html>
  );
}
