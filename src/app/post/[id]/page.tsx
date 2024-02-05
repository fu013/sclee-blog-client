import { SSRfetch } from "@/api/fetch";
import { iPost } from "@/interface";
import React from "react";

interface iProps {
  params: {
    id: number;
  };
}

const Page = async (props: iProps) => {
  const response = await SSRfetch(`/post?id=${props.params.id as number}`);
  const data: iPost[] = await response.json();
  return (
    <>
      <div>{data[0]?.title}</div>
      <article
        className="prose prose-sm sm:prose-base dark:prose-invert max-w-none pb-20 mb-20 border-b border-gray-300"
        dangerouslySetInnerHTML={{ __html: data[0]?.content }}
      />
    </>
  );
};

export default Page;
