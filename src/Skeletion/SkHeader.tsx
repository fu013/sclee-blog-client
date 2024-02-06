import Skeleton from "./Skeletion";

const SkHeader = () => {
  return (
    <nav className="pt-2">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          {/* 메뉴 */}
          <div className="flex space-x-4">
            <div>
              <div className="flex items-center">
                <Skeleton className="w-10 h-10 !rounded-full mr-4" />
                <Skeleton className="text-logo italic text-lightColor font-bold dark:text-darkColor text-[1.75rem] w-[11.5rem] h-[2rem]" />
              </div>
            </div>
          </div>

          {/* 메뉴2 */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="hidden md:flex items-center space-x-1">
              <Skeleton className="w-10 h-10 !rounded-full" />
              <Skeleton className="w-10 h-10 !rounded-full" />
            </div>
            <div className="ease-in-out duration-300 transition-all rounded-[100%] cursor-pointer hover:bg-[#f1f1f1] dark:hover:bg-[#aaa]">
              <Skeleton className="w-10 h-10 !rounded-full" />
            </div>
          </div>

          {/* mobile menu */}
          <div className="md:hidden flex items-center">
            <button>
              <Skeleton className="w-10 h-10 !rounded-full" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SkHeader;
