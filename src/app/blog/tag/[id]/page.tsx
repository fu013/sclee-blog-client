import SkMain from "@/skeletion/SkMain";
import Main from "@/component/Main";
import { Suspense } from "react";
import { SSRfetch } from "@/api/fetch";
import { iPost } from "@/interface";

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: number | number[] | undefined };
}) => {
  const page = searchParams?.page || 1;
  let jsonDataByTag: iPost[];
  let jsonDataLength = 0;
  const res = await SSRfetch(
    `/post/tag?id=${params.id as string}&page=${page as number}&size=5`
  );
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
    jsonDataByTag = await res.json();
  }

  return (
    <section>
      <Suspense fallback={<SkMain />}>
        <Main jsonData={jsonDataByTag} jsonDataLength={jsonDataLength} />
      </Suspense>
    </section>
  );
};

export default Page;
