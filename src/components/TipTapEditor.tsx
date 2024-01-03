"use client";
import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTapMenuBar from "./TipTapMenuBar";
import { Button } from "./ui/button";

type Props = {};

export default function TipTapEditor({}: Props) {
  const [editorState, setEditorState] = useState("");
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  return (
    <>
      <div className="flex">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button>Save</Button>
      </div>
      <div className="prose">
        <EditorContent editor={editor} />
      </div>
    </>
  );
}
