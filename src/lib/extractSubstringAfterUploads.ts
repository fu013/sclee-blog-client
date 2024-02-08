const extractSubstringAfterUploads = (filePath: string | null) => {
  const startIndex = filePath.indexOf("/uploads/") + "/uploads/".length;
  return filePath.substring(startIndex);
};

export default extractSubstringAfterUploads;
