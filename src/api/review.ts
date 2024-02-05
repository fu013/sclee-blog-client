import { myAxios } from "./myAxios";

const setReview = async (content: string, isPublic: boolean) => {
  try {
    await myAxios.post("/review/set", {
      content: content,
      is_public: isPublic ? "1" : "0",
    });
    alert("리뷰가 성공적으로 저장되었습니다.");
    location.href = "/";
  } catch (err) {
    console.error(err);
    alert("리뷰 저장 중 오류가 발생했습니다.");
    location.href = "/";
  }
};

export { setReview };
