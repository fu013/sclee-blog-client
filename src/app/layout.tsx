import Header from "@/component/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/component/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "seungchan.log",
  description: "Junior Full-Stack Developer",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <>{children}</>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
