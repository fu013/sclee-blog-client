const extractSubstringAfterUploads = (filePath: string | null) => {
  if (filePath) {
    const startIndex = filePath.indexOf("/uploads/") + "/uploads/".length;
    return filePath.substring(startIndex);
  } else {
    return null;
  }
};

export default extractSubstringAfterUploads;
