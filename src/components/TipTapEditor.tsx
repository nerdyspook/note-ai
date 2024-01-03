"use client";
import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTapMenuBar from "./TipTapMenuBar";
import { Button } from "./ui/button";
import { useDebounce } from "@/lib/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { NoteType } from "@/lib/db/schema";
import error from "next/error";

type Props = {
  note: NoteType;
};

export default function TipTapEditor({ note }: Props) {
  const [editorState, setEditorState] = useState(
    note.editorState || `<h1>${note.name}</h1>`
  );
  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/saveNote", {
        noteId: note.id,
        editorState,
      });

      return response.data;
    },
  });
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const debouncedEditorState = useDebounce(editorState, 500);

  useEffect(
    function () {
      if (debouncedEditorState !== "") {
        saveNote.mutate(undefined, {
          onSuccess: (data) => console.log("Updated successfully!", data),
          onError: (err) => console.error(err),
        });
      }
    },
    [debouncedEditorState]
  );

  return (
    <>
      <div className="flex">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button disabled variant="outline">
          {saveNote.isPending ? "Saving" : "Saved"}
        </Button>
      </div>
      <div className="prose">
        <EditorContent editor={editor} />
      </div>
    </>
  );
}
