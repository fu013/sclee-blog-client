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
            className="relative flex justify-start gap-sm items-start text-body font-normal hoverUnderline mr-5"
          >
            Write a New Post
          </Link>
          <Link
            href="https://github.com/fu013"
            target="_blank"
            title="깃허브 새 탭에서 링크 열기"
            className="relative flex justify-start gap-sm items-center text-body font-normal hoverUnderline mr-5"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              font-size="28"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM277.3 415.7c-8.4 1.5-11.5-3.7-11.5-8 0-5.4.2-33 .2-55.3 0-15.6-5.2-25.5-11.3-30.7 37-4.1 76-9.2 76-73.1 0-18.2-6.5-27.3-17.1-39 1.7-4.3 7.4-22-1.7-45-13.9-4.3-45.7 17.9-45.7 17.9-13.2-3.7-27.5-5.6-41.6-5.6-14.1 0-28.4 1.9-41.6 5.6 0 0-31.8-22.2-45.7-17.9-9.1 22.9-3.5 40.6-1.7 45-10.6 11.7-15.6 20.8-15.6 39 0 63.6 37.3 69 74.3 73.1-4.8 4.3-9.1 11.7-10.6 22.3-9.5 4.3-33.8 11.7-48.3-13.9-9.1-15.8-25.5-17.1-25.5-17.1-16.2-.2-1.1 10.2-1.1 10.2 10.8 5 18.4 24.2 18.4 24.2 9.7 29.7 56.1 19.7 56.1 19.7 0 13.9.2 36.5.2 40.6 0 4.3-3 9.5-11.5 8-66-22.1-112.2-84.9-112.2-158.3 0-91.8 70.2-161.5 162-161.5S388 165.6 388 257.4c.1 73.4-44.7 136.3-110.7 158.3zm-98.1-61.1c-1.9.4-3.7-.4-3.9-1.7-.2-1.5 1.1-2.8 3-3.2 1.9-.2 3.7.6 3.9 1.9.3 1.3-1 2.6-3 3zm-9.5-.9c0 1.3-1.5 2.4-3.5 2.4-2.2.2-3.7-.9-3.7-2.4 0-1.3 1.5-2.4 3.5-2.4 1.9-.2 3.7.9 3.7 2.4zm-13.7-1.1c-.4 1.3-2.4 1.9-4.1 1.3-1.9-.4-3.2-1.9-2.8-3.2.4-1.3 2.4-1.9 4.1-1.5 2 .6 3.3 2.1 2.8 3.4zm-12.3-5.4c-.9 1.1-2.8.9-4.3-.6-1.5-1.3-1.9-3.2-.9-4.1.9-1.1 2.8-.9 4.3.6 1.3 1.3 1.8 3.3.9 4.1zm-9.1-9.1c-.9.6-2.6 0-3.7-1.5s-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3 1.1 1.5 1.1 3.3 0 4.1zm-6.5-9.7c-.9.9-2.4.4-3.5-.6-1.1-1.3-1.3-2.8-.4-3.5.9-.9 2.4-.4 3.5.6 1.1 1.3 1.3 2.8.4 3.5zm-6.7-7.4c-.4.9-1.7 1.1-2.8.4-1.3-.6-1.9-1.7-1.5-2.6.4-.6 1.5-.9 2.8-.4 1.3.7 1.9 1.8 1.5 2.6z"></path>
            </svg>{" "}
            Github
          </Link>
          <Link
            href="https://twitter.com/kkusaeng"
            target="_blank"
            title="트위터 새 탭에서 링크 열기"
            className="relative flex justify-start gap-sm items-center text-body font-normal hoverUnderline"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              font-size="28"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z"></path>
            </svg>{" "}
            X(Twitter)
          </Link>
        </div>
      </div>
      <div className="mt-10">
        <h5 className="text-[#2bc1bc] font-bold text-[1.25rem]">
          <img
            className="w-[24px] ease-in-out duration-300 transition-all inline-block mr-2"
            src="/category.png"
          />
          Tag list
        </h5>
        <ul className="text-gray-700 basic-font-color">
          {/* <Link href={`/blog`} className="block ct-li font-bold mt-6">
            All({totalTags?.size})
          </Link> */}
          {totalTags &&
            Array.from(totalTags?.entries()).map(([tag, count]) => (
              <Link href={`/blog/tag/${tag}`} key={tag} className="block ct-li">
                {tag}
                {count > 1 ? `(${count})` : null}
              </Link>
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
