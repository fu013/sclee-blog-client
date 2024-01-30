import Aside from "@/component/Aside";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Main from "@/component/Main";

const Home = () => {
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
};

export default Home;
