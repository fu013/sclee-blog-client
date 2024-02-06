import { iPost } from "@/interface";
import Link from "next/link";
import TagTransformer from "./Common/TagTransformer";
import moment from "moment";

const Main = async ({ jsonData }: { jsonData: iPost[] }) => {
  return (
    <main>
      {/* Post Item Start */}
      {jsonData?.map((item: iPost) => (
        <Link
          href={`/blog/post/${item.pk}`} //shadow-[0_2px_4px_0_#ccd0d9]
          className="feed-wrapper basic-font-color flex"
          key={item.pk}
        >
          <img
            className="w-[12.5rem] h-[12.5rem] mr-10 border border-[#ccc] dark:border-[#454c53] rounded-xl"
            src="https://static.toss.im/assets/payments/contents/writer-2-thumb.jpg"
            alt="thumbnail"
          />
          <span className="feed btn-6 ">
            <div className="feed-info">
              <div className="border-[3px] font-bold py-2 px-2 text-[0.75rem] border-indigo-900 rounded-full">
                {moment(item?.createdDate).format("YYYY/MM/DD")}
              </div>
              <div>{TagTransformer(item.tags)}</div>
            </div>
            <h5 className="feed-title">{item.title}</h5>
            <p className="feed-des basic-font-color">{item.description}</p>
          </span>
        </Link>
      ))}
      {/* Post Item End */}
    </main>
  );
};

export default Main;
