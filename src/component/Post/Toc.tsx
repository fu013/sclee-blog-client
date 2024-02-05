"use client";
import useScrollPosition from "@/hook/useScrollPosition";
import React, { useEffect, useMemo, useState } from "react";

interface Toc {
  id: number;
  text: string | null;
  level: number;
}

interface TocProps {
  htmlString: string;
}

const Toc = ({ htmlString }: TocProps) => {
  const [tocList, setTocList] = useState<Toc[]>([]);
  const { scrollToEl } = useScrollPosition();

  useEffect(() => {
    const parser = new DOMParser();

    if (typeof window !== "undefined" && htmlString.trim() !== "") {
      const doc = parser.parseFromString(htmlString, "text/html");
      const headings = doc.querySelectorAll("h1, h2, h3");
      let id = 0;
      const updatedTocList: Toc[] = [];

      headings.forEach((heading) => {
        const text = heading.textContent;
        const level = parseInt(heading.tagName.substring(1), 10);

        if (text && text.trim() !== "") {
          updatedTocList.push({ id, text, level });
          id++;
        }
      });

      setTocList(updatedTocList);
    }
  }, [htmlString]);

  return (
    <div className="basic-font-color sticky top-28 mt-52 px-5 desktop:block mobile:hidden h-ful max-h-[600px] overflow-y-auto">
      {tocList.map((toc, index) => (
        <div
          key={index}
          className={`cursor-pointer px-3 border-l-4 py-1 text-sm ${
            toc.level === 2 ? "pl-10" : toc.level === 3 ? "pl-16" : "pl-5"
          } ${index === 0 ? "bg-blue-100 border-blue-300 text-gray-800" : ""}`}
          onClick={() => scrollToEl(toc.id)}
        >
          {toc.text}
        </div>
      ))}
    </div>
  );
};

export default Toc;
