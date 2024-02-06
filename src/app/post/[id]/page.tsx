import SkContent from "@/skeletion/SkContent";
import { SSRfetch } from "@/api/fetch";
import Content from "@/component/Post/Content";
import Toc from "@/component/Post/Toc";
import { iPost } from "@/interface";
import React, { Suspense } from "react";

interface iProps {
  params: {
    id: number;
  };
}

const Page = async (props: iProps) => {
  const response = await SSRfetch(`/post?id=${props.params.id as number}`);
  const data: iPost[] = await response.json();

  return (
    <div className="relative w-full h-auto flex desktop:left-[150px] mobile-left-auto">
      <Suspense fallback={<SkContent data={data} />}>
        <Content data={data} />
        <Toc htmlString={data[0]?.content} />
      </Suspense>
    </div>
  );
};

export default Page;
