"use client";
import useScrollPosition from "@/hook/useScrollPosition";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";

interface Toc {
  id: number;
  id_tag: string;
  text: string | null;
  level: number;
}

interface TocProps {
  htmlString: string;
}

const Toc = ({ htmlString }: TocProps) => {
  const [tocList, setTocList] = useState<Toc[]>([]);
  const { scrollPosition, scrollToEl } = useScrollPosition();

  useEffect(() => {
    const parser = new DOMParser();

    if (typeof window !== "undefined" && htmlString.trim() !== "") {
      const doc = parser.parseFromString(htmlString, "text/html");
      const headings = doc.querySelectorAll("h1, h2, h3, h4, h5");
      let id = 0;
      const updatedTocList: Toc[] = [];

      headings.forEach((heading) => {
        const text = heading.textContent;
        const level = parseInt(heading.tagName.substring(1), 10);
        const id_tag = `heading-${id}`;

        if (text && text.trim() !== "") {
          updatedTocList.push({ id: id, id_tag: id_tag, text, level });
          id++;
        }
      });

      setTocList(updatedTocList);
    }
  }, [htmlString]);

  const activeTocItemIdTag = useMemo(() => {
    const targetOffsets = tocList.map((item) => {
      const target = document.getElementById(item.id_tag);
      return target?.offsetTop ?? Infinity;
    });
    const lastIndex = targetOffsets.findIndex(
      (offset) => offset >= scrollPosition
    );
    if (lastIndex === -1) {
      return tocList[tocList.length - 1]?.id_tag ?? null;
    }

    return tocList[lastIndex - 1]?.id_tag ?? tocList[0]?.id_tag;
  }, [scrollPosition, tocList]);

  return (
    <div className="basic-font-color sticky top-28 mt-52 px-5 desktop:block mobile:hidden h-ful max-h-[600px] overflow-y-auto">
      {tocList.map((toc, index) => (
        <div
          key={index}
          className={`cursor-pointer px-3 border-l-4 py-1 text-sm 
                ${
                  activeTocItemIdTag === toc.id_tag
                    ? "bg-blue-100 border-blue-300 text-gray-800"
                    : "bg-transparent border-blue-200 dark:text-gray-500"
                }
                ${
                  toc.level === 2 ? "pl-10" : toc.level === 3 ? "pl-16" : "pl-5"
                }`}
          onClick={() => scrollToEl(toc.id)}
        >
          {toc.text}
        </div>
      ))}
    </div>
  );
};

export default Toc;
