import TipTapEditor from "@/components/TipTapEditor";
import { Button } from "@/components/ui/button";
import { clerk } from "@/lib/clerk-server";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    noteId: string;
  };
};

export default async function NotebookPage({ params: { noteId } }: Props) {
  const { userId } = await auth();
  if (!userId) return redirect("/dashboard");
  const user = await clerk.users.getUser(userId);
  const notes = await db
    .select()
    .from($notes)
    .where(and(eq($notes.id, parseInt(noteId)), eq($notes.userId, userId)));

  if (notes.length !== 1) {
    return redirect("/dashboard");
  }

  const note = notes[0];

  return (
    <div className="min-h-screen dashboard-bg bg-cover bg-gradient-to-tl from-sky-100 via-fuchsia-100 to-violet-100">
      <div className="max-w-4xl mx-auto p-4">
        <div className="border shadow-xl border-stone-200 rounded-lg p-4 flex items-center mb-4">
          <Link href="/dashboard">
            <Button className="bg-cyan-900" size="sm">
              Back
            </Button>
          </Link>
          <p className="ml-4 font-semibold">
            {user.firstName} {user.lastName}
          </p>
          <span className="inline-block mx-1">/</span>
          <p className="text-stone-500 font-semibold">{note.name}</p>
          <div className="ml-auto">Delete</div>
        </div>

        <div className="border border-stone-200 shadow-xl rounded-lg px-8 md:px-16 py-8 w-full">
          <TipTapEditor note={note} />
        </div>
      </div>
    </div>
  );
}
