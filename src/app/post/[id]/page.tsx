import React from "react";

interface iProps {
  params: {
    id: string;
  };
}

const Page = (props: iProps) => {
  return (
    <>
      Post
      {props.params.id}
    </>
  );
};

export default Page;
