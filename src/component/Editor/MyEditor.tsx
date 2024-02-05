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

const MyEditor = ({ id }: { id?: number }) => {
  const editorRef = useRef(null);
  const titleRef = useRef(null);
  const desRef = useRef(null);
  const tagsRef = useRef(null);
  let imageArr = useRef<string[]>([]);
  const [preview, setPreview] = useState<PreviewStyle>(
    window.innerWidth > 1000 ? "vertical" : "tab"
  );

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
    // const contentMarkdown = editorIns.getMarkdown();
    await setPost(
      titleRef?.current?.value,
      contentHtml,
      desRef?.current?.value,
      tagsRef?.current?.value,
      imageArr?.current
    );
  };

  const handleResize = () => {
    setPreview(window.innerWidth > 1000 ? "vertical" : "tab");
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

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
        }
        imageArr.current = filenames;
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
      /* 만약 이미지 배열이 존재한다면(임시 이미지), 페이지를 떠날 때, API 이미지 삭제 요청을 보냄 */
      if (imageArr.current.length > 0) {
        axios
          .delete(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/post/delImage?filenames=${imageArr.current}`
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

  return id === null ? (
    <div className="p-5">
      <div>
        <input
          type="file"
          className="border border-gray-300 outline-none py-3 px-3 mb-2 rounded"
          placeholder="thumbnail"
          multiple
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
  ) : null;
};

export default MyEditor;
