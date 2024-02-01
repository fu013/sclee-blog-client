import { myAxios } from "./myAxios";

const setPost = async (
  title: string,
  content: string,
  description: string,
  tags: string
) =>
  await myAxios.post("/post/set", {
    title: title,
    content: content,
    description: description,
    tags: tags,
  });

export { setPost };
