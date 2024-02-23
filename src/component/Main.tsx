/* eslint-disable @next/next/no-img-element */
import { iPost } from "@/interface";
import Link from "next/link";
import TagTransformer from "./Common/TagTransformer";
import moment from "moment";
import extractSubstringAfterUploads from "@/lib/extractSubstringAfterUploads";

const Main = async ({ jsonData }: { jsonData: iPost[] }) => {
  return (
    <main>
      <div className="mx-auto desktop:w-[960px] mobile:w-full">
        <div className="flex items-end justify-between">
          <div className="relative w-fit pr-2">
            <input
              type="text"
              placeholder="Type a keyword"
              className="py-2 px-4 border border-gray-300 rounded-[4px] pr-12 outline-none w-[200px] focus:border-blue-500 focus:w-[300px] transition-all duration-300 ease-out placeholder-gray-400"
            />
            <img
              className="absolute top-[-2px] right-0 mt-3 mr-4 w-6 text-gray-600 cursor-pointer opacity-80"
              src="/magnifying-glass.png"
            />
          </div>
          <div className="pr-5 text-[20px] font-bold">
            <span>All(1)</span>
          </div>
        </div>
        {/* Post Item Start */}
        {jsonData?.map((item: iPost) => (
          <Link
            href={`/blog/post/${item.pk}`} //shadow-[0_2px_4px_0_#ccd0d9]
            className="feed-wrapper basic-font-color flex relative hover:border hover:border-solid hover:border-[#6682ff] hover:transform hover:translate-x-3"
            key={item.pk}
          >
            <img
              className="w-[6.5rem] h-[6.5rem] mr-10"
              src={
                process.env.NEXT_PUBLIC_IMAGE_PREVIEW_URL +
                "/" +
                extractSubstringAfterUploads(item?.path)
              }
              alt="thumbnail"
            />
            <span className="feed btn-6 w-full">
              <div className="feed-info">
                <div>{TagTransformer(item.tags)}</div>
              </div>
              <h5 className="feed-title">{item.title}</h5>
              <div className="flex justify-between w-full items-center">
                <p className="feed-des basic-font-color">{item.description}</p>
                <div className="border-[3px] right-4 bottom-4 font-bold py-2 px-2 text-[0.75rem] border-indigo-900 rounded-full">
                  {moment(item?.createdDate).format("YYYY/MM/DD")}
                </div>
              </div>
            </span>
          </Link>
        ))}
      </div>
      {/* Post Item End */}
    </main>
  );
};

export default Main;
