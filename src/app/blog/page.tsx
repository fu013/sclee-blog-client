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
  searchParams?: { [key: string]: string | number | number[] | undefined };
}) => {
  const page = searchParams?.page || 1;
  let jsonData: iPost[];
  let jsonDataLength = 0;
  const response = await SSRfetch(`/post/all?page=${page as number}&size=5`);
  const fetchData = async () => {
    try {
      const response = await SSRfetch("/post/count");
      if (response.ok) {
        jsonDataLength = await response.json();
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  await fetchData();
  if (!response.ok) {
    console.error("Server returned an error:", response.status);
  } else {
    jsonData = await response.json();
  }

  return (
    <Suspense fallback={<SkMain />}>
      <Main jsonData={jsonData?.content} jsonDataLength={jsonDataLength} />
      <Pagination totalDataNums={jsonDataLength} currentPage={page} />
    </Suspense>
  );
};

export default Page;
