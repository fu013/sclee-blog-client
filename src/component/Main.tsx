import { SSGfetch } from "@/api/fetch";
import Link from "next/link";

interface iPost {
  pk: number;
  title: string;
  content: string;
  isPublic: string;
  isReview: string;
  comment: null | any;
  updatedDate: string;
  createdDate: string;
}

const Main = async () => {
  const response = await SSGfetch("/post/all");
  const jsonData: iPost[] = await response.json();

  return (
    <main className="basic-bg">
      <div className="feed-menu-wrapper basic-font-color">
        <ol className="feed-menu">
          <li className="fm-li basic-font-color">Board(3)</li>
          <li className="fm-li basic-font-color cursor-pointer">
            <Link href="/editor">Write</Link>
          </li>
        </ol>
      </div>
      {/* Post Item Start */}
      {jsonData?.map((item: iPost) => (
        <div className="feed-wrapper basic-font-color" key={item.pk}>
          <div className="feed">
            <div className="feed-photo"></div>
            <h5 className="feed-title">{item.title}</h5>
            <div
              className="feed-des basic-font-color"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
            <ul className="tags">
              <ol className="tag">ec2</ol>
              <ol className="tag">git</ol>
              <ol className="tag">jenkins</ol>
            </ul>
            <div className="feed-info">
              <div>{item.createdDate}</div>
              <div>0개의 댓글</div>
              <div>좋아요 4</div>
            </div>
          </div>
        </div>
      ))}
      {/* Post Item End */}
    </main>
  );
};

export default Main;
