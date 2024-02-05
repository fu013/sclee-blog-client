// 문자열 태그 => Span 태그 반환 컴포넌
const TagTransformer = (tags: string) => {
  if (!tags) return false;
  const tagsArray = tags.split(",");
  const transformedTags = tagsArray.map((tag, index) => (
    <span key={index}>#{tag.trim()} </span>
  ));
  return <>{transformedTags}</>;
};

export default TagTransformer;
