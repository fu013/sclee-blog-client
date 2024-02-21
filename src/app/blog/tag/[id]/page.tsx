import SkMain from "@/skeletion/SkMain";
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

  return (
    <section>
      <Suspense fallback={<SkMain />}>
        <Main jsonData={jsonDataByTag} />
      </Suspense>
    </section>
  );
};

export default Page;
