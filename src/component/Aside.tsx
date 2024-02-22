"use client";
import { SSRfetch } from "@/api/fetch";
import { iPost } from "@/interface";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Aside = () => {
  const [totalTags, setTotalTags] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAll = await SSRfetch("/post/all");
        const jsonData: iPost[] = await resAll.json();

        const newTotalTags = jsonData?.reduce(
          (accumulator: Map<string, number>, currentItem: any) => {
            const tagsArray = currentItem.tags?.split(",");
            tagsArray?.forEach((tag: string) => {
              const trimmedTag = tag.trim();
              const currentValue = accumulator.get(trimmedTag) || 0;
              accumulator.set(trimmedTag, currentValue + 1);
            });
            return accumulator;
          },
          new Map<string, number>()
        );
        setTotalTags(newTotalTags);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <aside>
      <div className="card bg-[url('/dogProfile.png')] bg-no-repeat bg-center bg-cover" />
      <h5 className="text-gray-700 mt-5 basic-font-color mx-auto text-center">
        Memories may fade, <br />
        but records last forever.
      </h5>
      <div className="justify-start flex">
        <div className="relative flex flex-col justify-start items-baseline gap-lg dark:text-white md:mt-xl md:my-xl px-xs mt-5">
          <Link
            href={`/blog/editor`}
            className="relative flex justify-start gap-sm items-start text-body font-bold hoverUnderline mr-5"
          >
            Write a New Post
          </Link>
          <Link
            href="https://github.com/fu013"
            target="_blank"
            title="깃허브 새 탭에서 링크 열기"
            className="relative flex justify-start gap-sm items-center text-body font-normal hoverUnderline mr-5 my-3 cursor-pointer"
          >
            <img
              className="w-[24px] ease-in-out duration-300 transition-all mr-2"
              src="/github.png"
            />
            Github
          </Link>
          <Link
            href="https://twitter.com/kkusaeng"
            target="_blank"
            title="트위터 새 탭에서 링크 열기"
            className="relative flex justify-start gap-sm items-center text-body font-normal hoverUnderline cursor-pointer"
          >
            <img
              className="w-[24px] ease-in-out duration-300 transition-all mr-2"
              src="/mail-inbox-app.png"
            />
            Mail
          </Link>
        </div>
      </div>
      <div className="mt-10">
        <h5 className="text-[#2bc1bc] font-bold text-[1.25rem]">📚 Tag list</h5>
        <ul className="text-gray-700 basic-font-color">
          {/* <Link href={`/blog`} className="block ct-li font-bold mt-6">
            All({totalTags?.size})
          </Link> */}
          {totalTags &&
            Array.from(totalTags?.entries()).map(([tag, count]) => (
              <Link href={`/blog/tag/${tag}`} key={tag} className="block ct-li">
                📄 {tag}
                {count > 1 ? `(${count})` : null}
              </Link>
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
