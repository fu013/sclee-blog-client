'use client';
import { MutableRefObject, useEffect, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import { PreviewStyle } from '@toast-ui/editor';

const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code', 'codeblock'],
    ['scrollSync'],
];

interface Props {
  editorRef: React.RefObject<Editor>
  images?: MutableRefObject<Images[]> // 글수정 시 필요
  initialValue?: string // 글수정 시 필요
}
}

export default function MyEditor({ editorRef, images, initialValue }: Props) {
  return (
    <>
        {
          editorRef && 
            <Editor
              ref={editorRef}
                  initialValue=''
                  initialEditType="markdown"
                  previewStyle='vertical' // tab || vertical
                  hideModeSwitch={true}
                  height="calc(100vh - 380px)"
                  theme={''} // '' & 'dark'
                  usageStatistics={false}
                  toolbarItems={toolbarItems}
                  useCommandShortcut={true}
                  plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]} 
                  hooks={{ addImageBlobHook: onUploadImage }} // firebase 이미지 업로드
            />
        }
    </>
  )
}