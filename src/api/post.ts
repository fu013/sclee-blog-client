import { myAxios } from "./myAxios";

const setPost = async (
  title: string,
  content: string,
  description: string,
  tags: string
) => {
  try {
    await myAxios.post("/post/set", {
      title: title,
      content: content,
      description: description,
      tags: tags,
    });
    alert("포스트가 성공적으로 저장되었습니다.");
    location.href = "/";
  } catch (err) {
    console.error(err);
    alert("포스트 저장 중 오류가 발생했습니다.");
    location.href = "/";
  }
};

export { setPost };
