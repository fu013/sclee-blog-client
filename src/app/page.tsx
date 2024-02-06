import Skaside from "@/skeletion/SkAside";
import SkMain from "@/skeletion/SkMain";
import Aside from "@/component/Aside";
import Main from "@/component/Main";
import { Suspense } from "react";

const RootPage = () => {
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

export default RootPage;
