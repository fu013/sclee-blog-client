import type { Metadata } from "next";
import Aside from "@/component/Aside";

export const metadata: Metadata = {
  title: "seungchan.log/post",
  description: "seungchan.log/post",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Aside />
      <>{children}</>
    </>
  );
};

export default Layout;
