"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {};

export default function CreateNoteDialog({}: Props) {
  const [input, setInput] = useState("");

  function handleInputChange(e) {
    setInput(e.target.value);
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
        <form>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Enter note book name here"
          />
          <div className="flex items-center gap-4 mt-5">
            <Button type="reset" variant="secondary">
              Cancel
            </Button>
            <Button className="bg-cyan-900">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
