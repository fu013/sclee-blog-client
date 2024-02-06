import TagTransformer from "@/component/Common/TagTransformer";
import { iPost } from "@/interface";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { JSDOM } from "jsdom";
import Review from "@/component/Post/Review";
import Skeleton from "./Skeletion";

const SkContent = async ({ data }: { data: iPost[] }) => {
  return (
    <div className="max-w-[900px] w-full p-[1.6rem] mx-auto h-fit relative rounded-lg overflow-hidden">
      <div className="mb-4 text-s sm:text-md text-gray-500">
        <Skeleton className="w-50 " />
      </div>
      <div className="font-[900] text-[2rem] basic-font-color">
        <Skeleton className="w-50 " />
      </div>
      <div className="text-sm sm:text-md text-gray-500 flex items-center justify-between">
        <Skeleton className="bg-blue-500 text-white py-1 px-2 rounded text-[13px]" />
        <Skeleton className="w-50 " />
      </div>
      <hr className="mt-4 mb-16" />
      <article
        className="prose prose-sm sm:prose-base dark:prose-invert max-w-none pb-20 mb-20 border-b border-gray-300"
        dangerouslySetInnerHTML={{ __html: data[0].html! }}
      />
    </div>
  );
};

export default SkContent;
