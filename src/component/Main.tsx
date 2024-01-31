import { SSRfetch } from "@/api/fetch";
import Link from "next/link";
import { useEffect } from "react";

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
  const response = await SSRfetch("/post/all");
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
            <h5 className="feed-title">Jenkins & Git 활용</h5>
            <p className="feed-des basic-font-color">
              📌 배경 최근 회사에 입사했는데, 20개 가까이되는 개발 프로젝트들이
              AWS EC2 서비스로 호스팅
            </p>
            <ul className="tags">
              <ol className="tag">ec2</ol>
              <ol className="tag">git</ol>
              <ol className="tag">jenkins</ol>
            </ul>
            <div className="feed-info">
              <div>2024년 1월 30일</div>
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
