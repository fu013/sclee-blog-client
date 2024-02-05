"use client";
import React, { useEffect, useState } from "react";

interface Toc {
  id: string;
  text: string | null;
  level: number;
}

interface TocProps {
  htmlString: string;
}

// content right Side TOC component
const Toc: React.FC<TocProps> = ({ htmlString }) => {
  const [tocList, setTocList] = useState<Toc[]>([]);

  useEffect(() => {
    const parser = new DOMParser();
    if (typeof window !== "undefined") {
      const doc = parser.parseFromString(htmlString, "text/html");
      const headings = doc.querySelectorAll("h1, h2, h3");

      const updatedTocList: Toc[] = [];
      headings.forEach((heading) => {
        const text = heading.textContent;
        const level = parseInt(heading.tagName.substring(1), 10);
        const id = heading.id;
        updatedTocList.push({ id, text, level });
      });

      setTocList(updatedTocList);
    }
  }, [htmlString]);

  return (
    <div className="sticky top-28 py-10 px-5 desktop:block mobile:hidden h-full">
      TOC
      {tocList.map((toc, index) => (
        <div
          key={index}
          className={`cursor-pointer px-3 border-l-4 py-1 text-sm ${
            toc.level === 2 ? "pl-10" : toc.level === 3 ? "pl-16" : "pl-5"
          }`}
        >
          {toc.text}
        </div>
      ))}
    </div>
  );
};

export default Toc;
