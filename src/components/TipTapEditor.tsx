"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Text from "@tiptap/extension-text";
import TipTapMenuBar from "./TipTapMenuBar";
import { Button } from "./ui/button";
import { useDebounce } from "@/lib/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { NoteType } from "@/lib/db/schema";
import { useCompletion } from "ai/react";

type Props = {
  note: NoteType;
};

export default function TipTapEditor({ note }: Props) {
  const [editorState, setEditorState] = useState(
    note.editorState || `<h1>${note.name}</h1>`
  );

  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });

  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/saveNote", {
        noteId: note.id,
        editorState,
      });

      return response.data;
    },
  });

  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": () => {
          const prompt = this.editor.getText().split(" ").slice(-30).join(" ");
          complete(" " + prompt);
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const lastCompletion = useRef("");

  const debouncedEditorState = useDebounce(editorState, 500);

  useEffect(
    function () {
      if (!completion || !editor) return;

      const diff = completion.slice(lastCompletion.current.length);
      lastCompletion.current = completion;

      editor.commands.insertContent(diff);
    },
    [completion, editor]
  );

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
      <div className="flex w-full">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button disabled variant="outline" className="ml-auto">
          {saveNote.isPending ? "Saving" : "Saved"}
        </Button>
      </div>
      <div className="prose my-4">
        <EditorContent editor={editor} />
      </div>
      <span className="text-sm text-slate-500">
        Tip: Press &nbsp;
        <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
          Shift + A
        </kbd>
        &nbsp; for AI autocomplete
      </span>
    </>
  );
}
