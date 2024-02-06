import React from "react";
import dynamic from "next/dynamic";

// 모듈을 빌드 타임이 아닌 런타임에 불러오도록 함
const MyEditor = dynamic(() => import("@/component/Editor/MyEditor"), {
  ssr: false,
});

interface iProps {
  params: {
    id: number;
  };
}

const Page = async (props: iProps) => {
  return (
    <>
      <MyEditor id={props.params.id} />
    </>
  );
};

export default Page;
