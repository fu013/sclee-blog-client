// export const fetchCache = "force-no-store";
// export const revalidate = 0; // seconds
export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <section className="!justify-center">
      <div className="mt-40">
        <div className="w-[300px] h-[300px] rounded-full bg-[url('/dogProfile.png')] bg-no-repeat bg-center bg-cover" />
      </div>
      <div className="ml-40 mt-40 prose basic-font">
        <h1 className="prose-heading">About</h1>
        <h5>안녕하세요! </h5>
        <h5>풀스택 개발자 '이승찬' 입니다.</h5>
        <br />
        <h5>저의 개발 중에 겪었던 경험들이나</h5>
        <h5>공부한 것들을 정리하고, 기록하기 위한 블로그입니다.</h5>
        <br />
        <h5>본 블로그는 Next.js와 Spring Framework로 제작되었습니다.</h5>
        <h5>방문해주셔서 감사합니다. 꾸벅</h5>
        <br />
      </div>
    </section>
  );
};

export default Page;
