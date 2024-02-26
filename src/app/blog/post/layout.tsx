import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post",
  description: "My Post",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-[100%] mx-auto py-20">{children}</div>;
};

export default Layout;
