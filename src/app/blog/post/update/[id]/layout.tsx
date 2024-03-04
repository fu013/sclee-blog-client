import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editor Update",
  description: "Updating a post on my blog",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[100%] mx-auto pl-[320px] pt-[80px]">{children}</div>
  );
};

export default Layout;
