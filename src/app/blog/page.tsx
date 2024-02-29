import SkMain from "@/skeletion/SkMain";
import Main from "@/component/Main";
import Pagination from "@/component/Common/Pagination";
import { Suspense } from "react";
import { SSRfetch } from "@/api/fetch";
import { iPost } from "@/interface";

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const page = searchParams?.page || "1";
  const response = await SSRfetch(`/post/all?page=${page}`);
  let jsonData: iPost[];
  if (!response.ok) {
    console.error("Server returned an error:", response.status);
  } else {
    jsonData = await response.json();
  }

  return (
    <Suspense fallback={<SkMain />}>
      <Main jsonData={jsonData} />
      <Pagination totalDataNums={jsonData?.length} currentPage={page} />
    </Suspense>
  );
};

export default Page;
