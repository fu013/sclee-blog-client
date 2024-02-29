import { SSRfetch } from "@/api/fetch";
import { iPost } from "@/interface";
import Skeleton from "./Skeletion";

const SkMain = async () => {
  const response = await SSRfetch("/post/all?page=1&size=5");
  const jsonData: iPost[] = await response.json();
  return (
    <main>
      {/* Post Item Start */}
      {jsonData?.content.map((item: iPost) => (
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
