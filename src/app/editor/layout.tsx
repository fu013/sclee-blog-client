import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Editor",
  description: "Writing a post on my blog",
};

const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-[1200px] mx-auto my-20">{children}</div>;
};

export default EditorLayout;
