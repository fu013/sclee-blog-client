import Aside from "@/component/Aside";
import Footer from "@/component/Footer";
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
      <Footer />
    </>
  );
}
