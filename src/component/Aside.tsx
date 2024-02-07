"use client";
import { iPost } from "@/interface";
import Link from "next/link";
import React from "react";

const Aside = ({ jsonData }: { jsonData: iPost[] }) => {
  // 배열을 순차적으로 순회하며 맵을 만듬, 중복값이 있는지 찾고, 없으면 Key로 추가, 이미 있으면 key value를 + 1함, 최종적으로 중복 제거된 맵을 반환
  const totalTags = jsonData.reduce(
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
  return (
    <aside>
      <div className="card bg-[url('/dogProfile.png')] bg-no-repeat bg-center bg-cover" />
      <h5 className="text-gray-700 mt-5 basic-font-color mx-auto text-center">
        Memories may fade, <br />
        but records last forever.
      </h5>
      <Link href={`/blog/editor`} className="block ct-li font-bold mt-6">
        글쓰기
      </Link>
      <div className="mt-10">
        <h5 className="text-[#2bc1bc] font-bold text-[1.25rem]">
          <img
            className="w-[24px] ease-in-out duration-300 transition-all inline-block mr-2"
            src="/category.png"
          />
          태그 목록
        </h5>
        <ul className="text-gray-700 basic-font-color">
          <Link href={`/blog`} className="block ct-li font-bold mt-6">
            전체 보기({totalTags.size})
          </Link>
          {Array.from(totalTags.entries()).map(([tag, count]) => (
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
