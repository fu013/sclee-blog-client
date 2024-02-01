import { SSRfetch } from "@/api/fetch";
import { iPost } from "@/interface";
import Link from "next/link";

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

  return (
    <main className="basic-bg">
      <div className="feed-menu-wrapper basic-font-color flex">
        <ol className="feed-menu">
          <li className="fm-li basic-font-color">
            <span>All Tags({jsonData.length})</span>
            <span> Redis(1)</span>
            <span> AWS(3)</span>
            <span> Algorithm(7)</span>
            <span className="font-bold">
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
