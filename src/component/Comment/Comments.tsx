"use client";
import React from "react";
import { useTheme } from "next-themes";

const PostComment: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section
      ref={(elem) => {
        if (!elem) {
          return;
        }
        const scriptElem = document.createElement("script");
        scriptElem.src = "https://utteranc.es/client.js";
        scriptElem.async = true;
        scriptElem.setAttribute("repo", "fu013/sclee-blog-client");
        scriptElem.setAttribute("issue-term", "pathname");
        scriptElem.setAttribute("theme", `github-${theme}`);
        scriptElem.setAttribute("label", "💬");
        scriptElem.crossOrigin = "anonymous";
        elem.replaceChildren(scriptElem);
      }}
    />
  );
};

export default PostComment;
