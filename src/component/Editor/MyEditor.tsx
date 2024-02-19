"use client";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "tui-color-picker/dist/tui-color-picker.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { setPost } from "@/api/post";
import { Editor } from "@toast-ui/react-editor";
import { PreviewStyle } from "@toast-ui/react-editor";
import Prism from "prismjs";
import "prismjs/components/prism-clojure.js";
import axios from "axios";
import { SSRfetch } from "@/api/fetch";
import { v4 as uuidv4 } from "uuid";

const newUUID: string = uuidv4();

const MyEditor = ({ id }: { id?: number }) => {
  const editorRef = useRef(null);
  const titleRef = useRef(null);
  const desRef = useRef(null);
  const tagsRef = useRef(null);
  let imageArr = useRef<{ url: string; isThumbnail: string }[]>([]);
  const [preview, setPreview] = useState<PreviewStyle>(
    window.innerWidth > 1000 ? "vertical" : "tab"
  );
  const [data, setData] = useState<any>([]);

  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["table", "image", "link"],
    ["code", "codeblock"],
    ["scrollSync"],
  ];

  interface Props {
    editorRef: React.RefObject<Editor>;
    images?: MutableRefObject<any[]>;
    initialValue?: string;
  }

  const writePost = async () => {
    const editorIns = editorRef.current.getInstance();
    const contentHtml = editorIns.getHTML();
    const contentMarkdown = editorIns.getMarkdown();
    await setPost(
      titleRef?.current?.value,
      contentHtml,
      contentMarkdown,
      desRef?.current?.value,
      tagsRef?.current?.value.trim(),
      JSON.stringify(imageArr?.current)
    );
  };

  const handleResize = () => {
    setPreview(window.innerWidth > 1000 ? "vertical" : "tab");
  };

  const fetchAPI = async () => {
    const response = await SSRfetch(`/post?id=${id as number}`);
    setData(await response.json());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (id !== undefined) fetchAPI();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const addImageBlobHook = async (
      blob: Blob,
      callback: (imageUrl: string, type: string) => void
    ) => {
      const formData = new FormData();
      formData.append("img", blob);
      try {
        const { data: filenames } = await axios.post<string[]>(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/post/addImage`,
          formData,
          { headers: { "content-type": "multipart/form-data" } }
        );
        for (const filename of filenames) {
          const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_PREVIEW_URL}/${filename}`;
          callback(imageUrl, "image");
          imageArr.current.push({ url: filename, isThumbnail: "0" });
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
      return false;
    };

    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.removeHook("addImageBlobHook");
      editorInstance.addHook("addImageBlobHook", addImageBlobHook);
    }

    return () => {
      if (imageArr.current.length > 0) {
        const urls = imageArr.current.map((image) => image.url);

        const queryParams = urls
          .map((url) => `filenames=${encodeURIComponent(url)}`)
          .join("&");

        axios
          .delete(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/post/delImage?${queryParams}`
          )
          .then(() => {
            console.log("DELETE request successful");
          })
          .catch((error) => {
            console.error("Error sending DELETE request:", error);
          });
      }
    };
  }, [editorRef]);

  /* 에디터 가장 상단에 Thumbnail 이미지 별개로 업로드 */
  const thumbUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    for (const file of files) {
      const formData = new FormData();
      const fileExtension = file.name.split(".").pop();
      const imageNameWithExtension = `.${fileExtension}`;
      const blob = file.slice(0, file.size, file.type);
      formData.append("img", blob, imageNameWithExtension);

      try {
        const { data: filenames } = await axios.post<string[]>(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/post/addImage`,
          formData,
          { headers: { "content-type": "multipart/form-data" } }
        );

        const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_PREVIEW_URL}/${filenames[0]}`;
        const isThumbnail = "1";
        const existingThumbnailIndex = imageArr.current.findIndex(
          (img) => img.isThumbnail === isThumbnail
        );
        const editorInstance = editorRef.current.getInstance();
        const currentMarkdown = editorInstance.getMarkdown();
        const markdownWithImage = `![Image Alt Text](${imageUrl})\n${currentMarkdown}`;
        if (editorRef.current) {
          editorInstance.setMarkdown(markdownWithImage);
        }
        if (existingThumbnailIndex !== -1) {
          imageArr.current[existingThumbnailIndex].url = filenames[0];
        } else {
          imageArr.current.push({ url: filenames[0], isThumbnail });
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return id !== undefined ? (
    <div className="p-5">
      <div>
        <input
          type="file"
          className="border border-gray-300 outline-none py-3 px-3 mb-2 rounded"
          placeholder="thumbnail"
          multiple
          onChange={thumbUpload}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter the Title"
          ref={titleRef}
          value={data[0]?.title}
          className="border border-gray-300 outline-none w-full py-3 px-3 mb-2 rounded"
        />
        <input
          type="text"
          placeholder="Enter the Desc"
          ref={desRef}
          value={data[0]?.description}
          className="border border-gray-300 outline-none w-full py-3 px-3 mb-2 rounded"
        />
        <input
          type="text"
          placeholder="Enter the Tags Split ','"
          ref={tagsRef}
          value={data[0]?.tags}
          className="border border-gray-300 outline-none w-full py-3 px-3 mb-2 rounded"
        />
      </div>
      {editorRef && data[0]?.markdown && (
        <Editor
          ref={editorRef}
          initialValue={data[0]?.markdown}
          initialEditType="markdown"
          previewStyle={preview} // tab || vertical
          hideModeSwitch={true}
          height="calc(100vh - 380px)"
          theme={""} // '' & 'dark'
          usageStatistics={false}
          useCommandShortcut={false}
          useDefaultHTMLSanitizer={false}
          toolbarItems={toolbarItems}
          plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        />
      )}
      <div className="text-right">
        <button
          className="border border-gray-100 cursor-pointer py-5 px-10 rounded bg-primary-1 text-blue-50 mt-3"
          onClick={writePost}
        >
          Update
        </button>
      </div>
    </div>
  ) : (
    <div className="p-5">
      <div>
        <input
          type="file"
          className="border border-gray-300 outline-none py-3 px-3 mb-2 rounded"
          placeholder="thumbnail"
          multiple
          onChange={thumbUpload}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter the Title"
          ref={titleRef}
          className="border border-gray-300 outline-none w-full py-3 px-3 mb-2 rounded"
        />
        <input
          type="text"
          placeholder="Enter the Desc"
          ref={desRef}
          className="border border-gray-300 outline-none w-full py-3 px-3 mb-2 rounded"
        />
        <input
          type="text"
          placeholder="Enter the Tags Split ','"
          ref={tagsRef}
          className="border border-gray-300 outline-none w-full py-3 px-3 mb-2 rounded"
        />
      </div>
      {editorRef && (
        <Editor
          ref={editorRef}
          initialValue=""
          initialEditType="markdown"
          previewStyle={preview} // tab || vertical
          hideModeSwitch={true}
          height="calc(100vh - 380px)"
          theme={""} // '' & 'dark'
          usageStatistics={false}
          useCommandShortcut={true}
          useDefaultHTMLSanitizer={false}
          toolbarItems={toolbarItems}
          plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        />
      )}
      <div className="text-right">
        <button
          className="border border-gray-100 cursor-pointer py-5 px-10 rounded bg-primary-1 text-blue-50 mt-3"
          onClick={writePost}
        >
          Write
        </button>
      </div>
    </div>
  );
};

export default MyEditor;
