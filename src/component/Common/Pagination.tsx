"use client";
import Link from "next/link";

interface PaginationProps {
  totalDataNums: number;
  currentPage: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalDataNums,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalDataNums / 5); // 페이지당 5개의 아이템으로 가정

  console.log(totalPages);
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Link
          href={`/blog?page=${i}`}
          key={i}
          className={currentPage === i.toString() ? "active" : ""}
        >
          {i}
        </Link>
      );
    }
    return buttons;
  };

  return (
    <div className="pagination text-white text-center">
      {renderPaginationButtons()}
    </div>
  );
};

export default Pagination;
