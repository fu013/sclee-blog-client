import { SSRfetch } from "@/api/fetch";
import { iPost } from "@/interface";
import Link from "next/link";
import moment from "moment";
import TagTransformer from "@/component/Common/TagTransformer";
import Skeleton from "./Skeletion";

const SkMain = async () => {
  const response = await SSRfetch("/post/all");
  const jsonData: iPost[] = await response.json();

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
    <main>
      <div className="feed-menu-wrapper basic-font-color flex mb-20">
        <ol className="feed-menu">
          <li className="fm-li basic-font-color">
            {/* <span className="font-bold">All Tags({totalTags.size})</span> */}
            {Array.from(totalTags.entries()).map(([tag, count]) => (
              <Skeleton
                key={tag}
                className="px-2 w-[100px] h-[30px] border inline-block border py-1 px-4 rounded-2xl mx-2 text-[13px] cursor-pointer"
              />
            ))}
          </li>
        </ol>
      </div>
      {/* Post Item Start */}
      {jsonData?.map((item: iPost) => (
        <div className="feed-wrapper basic-font-color flex" key={item.pk}>
          <Skeleton className="w-[12.5rem] h-[12.5rem] mr-10 border border-[#ccc] dark:border-[#454c53] rounded-xl" />
          <span className="feed btn-6 block flex-auto">
            <div className="feed-info">
              <Skeleton className="border-[3px] font-bold py-2 px-2 text-[0.75rem] border rounded-full w-[94px] h-[40px]" />
              <Skeleton className="w-[100%] h-[20px] rounded-3xl" />
            </div>
            <Skeleton className="feed-title h-[48px] w-full " />
            <Skeleton className="h-[24px] w-full" />
          </span>
        </div>
      ))}
      {/* Post Item End */}
    </main>
  );
};

export default SkMain;
