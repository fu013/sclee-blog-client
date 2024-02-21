import SkMain from "@/skeletion/SkMain";
import Main from "@/component/Main";
import { Suspense } from "react";
import { SSRfetch } from "@/api/fetch";
import { iPost } from "@/interface";

const Page = async () => {
  const response = await SSRfetch("/post/all");
  let jsonData: iPost[];
  if (!response.ok) {
    console.error("Server returned an error:", response.status);
  } else {
    jsonData = await response.json();
  }

  return (
    <section>
      <Suspense fallback={<SkMain />}>
        <Main jsonData={jsonData} />
      </Suspense>
    </section>
  );
};

export default Page;
