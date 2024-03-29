import TagTransformer from "@/component/Common/TagTransformer";
import { iPost } from "@/interface";
import moment from "moment";
import React from "react";
import Link from "next/link";
import { JSDOM } from "jsdom";
import DeleteButton from "./DeleteButton";
import Comments from "../Comment/Comments";
import PostComment from "../Comment/Comments";

const Content = async ({
  data,
  querystring,
}: {
  data: iPost[];
  querystring: number;
}) => {
  let modifiedHtmlString;
  const parseHTML = () => {
    if (data[0]?.html) {
      const dom = new JSDOM(data[0]?.html);
      const document = dom.window.document;
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5");
      let id = 0;

      headings.forEach((heading: any) => {
        heading.setAttribute("id", `heading-${id}`);
        id++;
      });

      modifiedHtmlString = dom.serialize();
    }
  };
  parseHTML();

  return (
    <div className="max-w-[900px] w-full p-[1.6rem] pl-[6rem] mx-auto h-fit relative rounded-lg overflow-hidden">
      <div className="mb-4 text-s sm:text-md text-gray-500">
        {TagTransformer(data[0]?.tags)}
      </div>
      <div className="font-[900] text-[2rem] basic-font-color">
        {data[0]?.title}
      </div>
      <div className="text-sm sm:text-md text-gray-500 flex items-center justify-between">
        <div>
          <Link
            href={`/blog/post/update/${querystring}`}
            className="bg-blue-500 text-white py-1 px-2 rounded text-[13px]"
            type="button"
          >
            수정하기
          </Link>
          <DeleteButton querystring={querystring} />
        </div>
        <span>{moment(data[0]?.createdDate).format("YYYY-MM-DD")}</span>
      </div>
      <hr className="mt-4 mb-16" />
      <article
        className="prose prose-sm sm:prose-base dark:prose-invert max-w-none pb-20 mb-20 border-b border-gray-300"
        dangerouslySetInnerHTML={{ __html: modifiedHtmlString! }}
      />
      <div>
        <PostComment />
      </div>
    </div>
  );
};

export default Content;
