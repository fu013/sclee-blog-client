import { SSRfetch } from "@/api/fetch";
import { iPost } from "@/interface";
import Link from "next/link";

// 태그 문자열 span으로 분리하기
const TagTransformer = (tags: string) => {
  if (!tags) return false;
  const tagsArray = tags.split(",");
  const transformedTags = tagsArray.map((tag, index) => (
    <span key={index}>#{tag.trim()} </span>
  ));
  return <>{transformedTags}</>;
};

const Main = async () => {
  const response = await SSRfetch("/post/all");
  const jsonData: iPost[] = await response.json();

  // 배열을 순차적으로 순회하며 맵을 만듬, 중복값이 있는지 찾고, 없으면 Key로 추가, 이미 있으면 key value를 + 1함, 중복 제거된 맵을 반환
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
    <main className="basic-bg">
      <div className="feed-menu-wrapper basic-font-color flex">
        <ol className="feed-menu">
          <li className="fm-li basic-font-color">
            <span className="font-bold">All Tags({totalTags.size})</span>
            {Array.from(totalTags.entries()).map(([tag, count]) => (
              <span key={tag} className="px-2">
                {tag}
                {count > 1 ? `(${count})` : null}
              </span>
            ))}
            <span className="font-bold px-2">
              <Link href="/editor"> Write a Post</Link>
            </span>
          </li>
        </ol>
      </div>
      {/* Post Item Start */}
      {jsonData?.map((item: iPost) => (
        <Link
          href={`/post/${item.pk}`}
          className="feed-wrapper basic-font-color"
          key={item.pk}
        >
          <div className="feed">
            <div className="feed-info">
              <div className="border-2 font-bold py-2 px-2 text-[0.75rem] border-indigo-900 rounded-full ">
                2024/02/01
              </div>
              <div>{TagTransformer(item.tags)}</div>
            </div>
            <h5 className="feed-title">{item.title}</h5>
            <p className="feed-des basic-font-color">{item.description}</p>
          </div>
        </Link>
      ))}
      {/* Post Item End */}
    </main>
  );
};

export default Main;
