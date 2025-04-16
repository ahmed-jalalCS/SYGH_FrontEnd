"use client";

// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Raleway } from "next/font/google";
import { UserProvider } from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

// export const metadata: Metadata = {
//   title: "منصة الخريجين الذكية - اليمن",
//   description: "جميع أبحاث ومشاريع التخرج لجامعات اليمن في مكان واحد",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} antialiased`}
    >
      <body className="font-raleway-black">
        <UserProvider>
          <Toaster position="top-center" reverseOrder={false} />
          {!isDashboard && <Navbar />}
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
