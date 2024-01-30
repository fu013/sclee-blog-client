import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Editor",
  description: "Writing a post on my blog",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <body className={inter.className}>{children}</body>
    </div>
  );
};

export default Layout;
