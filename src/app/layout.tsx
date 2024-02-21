import Header from "@/component/Header";
import "./globals.css";

import "./prism.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/component/Footer";
import { Suspense } from "react";
import SkHeader from "@/skeletion/SkHeader";
import Providers from "./Provider";
import Aside from "@/component/Aside";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "seungchan.log",
  description: "Junior Full-Stack Developer",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<SkHeader />}>
            <Header />
          </Suspense>
          <Aside />
          <>{children}</>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
