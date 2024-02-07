import { myAxios } from "./myAxios";

const setPost = async (
  title: string,
  html: string,
  markdown: string,
  description: string,
  tags: string,
  imageArr: any
) => {
  try {
    await myAxios.post("/post/set", {
      title: title,
      html: html,
      markdown: markdown,
      description: description,
      tags: tags,
      imageArr: imageArr,
    });
    alert("포스트가 성공적으로 저장되었습니다.");
    location.href = "/blog";
  } catch (err) {
    console.error(err);
    alert("포스트 저장 중 오류가 발생했습니다.");
    location.href = "/blog";
  }
};

export { setPost };
