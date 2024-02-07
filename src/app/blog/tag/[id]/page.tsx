import Skaside from "@/skeletion/SkAside";
import SkMain from "@/skeletion/SkMain";
import Aside from "@/component/Aside";
import Main from "@/component/Main";
import { Suspense } from "react";
import { SSRfetch } from "@/api/fetch";
import { iPost } from "@/interface";

interface iProps {
  params: {
    id: string;
  };
}

const Page = async (props: iProps) => {
  const res = await SSRfetch(`/post/tag?id=${props.params.id as string}`);
  const jsonDataByTag: iPost[] = await res.json();

  const resAll = await SSRfetch("/post/all");
  const jsonDataAll: iPost[] = await resAll.json();

  return (
    <section>
      <Suspense fallback={<SkMain />}>
        <Main jsonData={jsonDataByTag} />
      </Suspense>
      <Suspense fallback={<Skaside />}>
        <Aside jsonData={jsonDataAll} />
      </Suspense>
    </section>
  );
};

export default Page;
