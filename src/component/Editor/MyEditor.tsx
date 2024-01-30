"use client";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { Editor } from "@toast-ui/react-editor";
import { useRef } from "react";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

const MyEditor = () => {
  const editorRef = useRef(null);
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["image"],
    ["code"],
    ["scrollSync"],
  ];

  const showContent = () => {
    const editorIns = editorRef.current.getInstance();
    const contentHtml = editorIns.getHTML();
    const contentMark = editorIns.getMarkdown();
  };

  return (
    <>
      <div>
        <input
          type="file"
          className="border border-gray-300 outline-none py-3 px-3 mb-2 rounded"
          multiple
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="title"
          className="border border-gray-300 outline-none w-full py-3 px-3 mb-2 rounded"
        />
      </div>
      <Editor
        ref={editorRef}
        initialValue="" // 글 수정 시 사용
        initialEditType="markdown" // wysiwyg & markdown
        hideModeSwitch={false}
        height="500px"
        theme={""} // '' & 'dark'
        usageStatistics={false}
        toolbarItems={toolbarItems}
        plugins={[colorSyntax]}
        previewStyle={"vertical"}
      />
      <div className="text-right">
        <button
          className="border border-gray-100 cursor-pointer py-5 px-10 rounded bg-primary-1 text-blue-50 mt-3"
          onClick={showContent}
        >
          Write
        </button>
      </div>
    </>
  );
};

export default MyEditor;
