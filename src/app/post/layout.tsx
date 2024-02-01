import type { Metadata } from "next";
import "prismjs/themes/prism.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs";

export const metadata: Metadata = {
  title: "Post",
  description: "My Post",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-[1200px] mx-auto my-20">{children}</div>;
};

export default Layout;
