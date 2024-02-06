import Skaside from "@/Skeletion/SkAside";
import SkMain from "@/skeletion/SkMain";
import Aside from "@/component/Aside";
import Main from "@/component/Main";
import { Suspense } from "react";

const Page = () => {
  return (
    <section>
      <Suspense fallback={<SkMain />}>
        <Main />
      </Suspense>
      <Suspense fallback={<Skaside />}>
        <Aside />
      </Suspense>
    </section>
  );
};

export default Page;
