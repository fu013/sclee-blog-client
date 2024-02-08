import Skaside from "@/skeletion/SkAside";
import SkMain from "@/skeletion/SkMain";
import Aside from "@/component/Aside";
import Main from "@/component/Main";
import { Suspense } from "react";
import { SSRfetch } from "@/api/fetch";
import { iPost } from "@/interface";

const Page = async () => {
  const response = await SSRfetch("/post/all");
  if (!response.ok) {
    console.error("Server returned an error:", response.status);
    return;
  }
  const jsonData: iPost[] = await response.json();

  return (
    <section>
      <Suspense fallback={<SkMain />}>
        <Main jsonData={jsonData} />
      </Suspense>
      <Suspense fallback={<Skaside />}>
        <Aside jsonData={jsonData} />
      </Suspense>
    </section>
  );
};

export default Page;
