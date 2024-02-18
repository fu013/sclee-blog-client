import { iPost } from "@/interface";
import Link from "next/link";
import TagTransformer from "./Common/TagTransformer";
import moment from "moment";
import extractSubstringAfterUploads from "@/lib/extractSubstringAfterUploads";

const Main = async ({ jsonData }: { jsonData: iPost[] }) => {
  return (
    <main>
      {/* Post Item Start */}
      {jsonData?.map((item: iPost) => (
        <Link
          href={`/blog/post/${item.pk}`} //shadow-[0_2px_4px_0_#ccd0d9]
          className="feed-wrapper basic-font-color flex relative"
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
      {/* Post Item End */}
    </main>
  );
};

export default Main;
