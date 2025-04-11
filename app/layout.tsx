import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Raleway } from "next/font/google";
import { UserProvider } from "./context/UserContext";
import { Toaster } from "react-hot-toast";
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

export const metadata: Metadata = {
  title: "Smart Yemen Graduate Hub",
  description: "all graduation researches and project for all Yemeni universities in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} antialiased`}
    >
      <body className="font-raleway-black">
        <UserProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
