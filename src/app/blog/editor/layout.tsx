import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editor",
  description: "Writing a post on my blog",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-[100%] mx-auto my-20">{children}</div>;
};

export default Layout;
