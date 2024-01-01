"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {};

export default function CreateNoteDialog({}: Props) {
  const router = useRouter();
  const [input, setInput] = useState("");

  const createNotebook = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/createNoteBook", {
        name: input,
      });

      return response.data;
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input === "") {
      window.alert("Please enter a name for your notebook");
      return;
    }

    createNotebook.mutate(undefined, {
      onSuccess: ({ note_id }) => {
        console.log("Note created", { note_id });
        router.push(`/notebook/${note_id}`);
      },
      onError: (error) => {
        console.error(error);
        window.alert("Failed to create new notebook");
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="border-dashed border-2 border-cyan-600 h-full rounded-lg flex items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4">
          <Plus
            className="w-6 h-6 mr-2 sm:mr-0 text-cyan-600"
            strokeWidth={3}
          />
          <h2 className="font-semibold text-cyan-600 sm:mt-2">New Note Book</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New note book</DialogTitle>
          <DialogDescription>
            You can create a new note by clicking below
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter note book name here"
          />
          <div className="flex items-center gap-4 mt-5">
            <Button type="reset" variant="secondary">
              Cancel
            </Button>
            <Button className="bg-cyan-900" disabled={createNotebook.isPending}>
              {createNotebook.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}{" "}
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
