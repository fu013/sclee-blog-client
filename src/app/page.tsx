import Aside from "@/component/Aside";
import Header from "@/component/Header";
import Main from "@/component/Main";

export default function Home() {
  return (
    <>
      <Header />
      <section>
        <Aside />
        <Main />
      </section>
    </>
  );
}
