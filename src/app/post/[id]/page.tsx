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
      <div
        className="border border-rose-600 rounded-xl p-10 mt-5"
        dangerouslySetInnerHTML={{ __html: data[0]?.content }}
      />
    </>
  );
};

export default Page;
