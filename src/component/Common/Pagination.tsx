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
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Link
          href={`/blog?page=${i}`}
          key={i}
          className={
            currentPage === i.toString()
              ? "active basic-font-color mx-4 text-[20px] font-bold"
              : "basic-font-color mx-4 text-[20px]"
          }
        >
          {i}
        </Link>
      );
    }
    return buttons;
  };

  return (
    <div className="pagination pl-[280px] mb-[80px] text-white text-center">
      {renderPaginationButtons()}
    </div>
  );
};

export default Pagination;
