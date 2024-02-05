import { SSRfetch } from "@/api/fetch";
import { iPost } from "@/interface";
import moment from "moment";
import React from "react";

interface iProps {
  params: {
    id: number;
  };
}

const Page = async (props: iProps) => {
  const response = await SSRfetch(`/post?id=${props.params.id as number}`);
  const data: iPost[] = await response.json();
  moment;
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="font-[900] text-[2rem]">{data[0]?.title}</div>
      <div className="flex justify-end">
        <div>{moment(data[0]?.createdDate).format("YYYY-MM-DD HH:mm:ss")}</div>
      </div>
      <hr className="mt-4 mb-16" />
      <article
        className="prose prose-sm sm:prose-base dark:prose-invert max-w-none pb-20 mb-20 border-b border-gray-300"
        dangerouslySetInnerHTML={{ __html: data[0]?.content }}
      />
    </div>
  );
};

export default Page;
