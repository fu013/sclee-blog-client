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
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript.min";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-tsx.min";
import { Editor } from "@toast-ui/react-editor";
import { PreviewStyle } from "@toast-ui/react-editor";
// import codeSyntaxHighlightPlugin from "@toast-ui/editor-plugin-code-syntax-highlight";
// import "highlight.js/styles/github.css";
// import hljs from "highlight.js";

const MyEditor = () => {
  const editorRef = useRef(null);
  const titleRef = useRef(null);
  const desRef = useRef(null);
  const tagsRef = useRef(null);
  const [preview, setPreview] = useState<PreviewStyle>(
    window.innerWidth > 1000 ? "vertical" : "tab"
  );

  useEffect(() => {
    Prism.highlightAll();
  }, []);

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
      tagsRef?.current?.value
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

  return (
    <div className="p-5">
      <div>
        <pre className="line-numbers">
          <code className="language-javascript">console.log(1)</code>
        </pre>
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
          plugins={[colorSyntax]}
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
