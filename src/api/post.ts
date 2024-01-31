import { myAxios } from "./myAxios";

const setPost = async (title: string, content: string) =>
  await myAxios.post("/post/set", {
    title: title,
    content: content,
  });

export { setPost };
