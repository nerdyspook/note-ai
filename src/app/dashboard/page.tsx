import CreateNoteDialog from "@/components/CreateNoteDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { UserButton, auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default async function DashboardPage({}: Props) {
  const { userId } = auth();

  const notes = await db
    .select()
    .from($notes)
    .where(eq($notes.userId, userId!));

  return (
    <div className="min-h-screen dashboard-bg bg-cover bg-gradient-to-tl from-sky-100 via-fuchsia-100 to-violet-100">
      <div className="max-w-7xl mx-auto p-10">
        <div className="h-14"></div>
        <div className="flex justify-between items-center flex-col md:flex-row">
          <div className="w-screen flex justify-center md:justify-start items-center">
            <Link href="/">
              <Button className="bg-cyan-900" size="sm">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
            </Link>

            <div className=" mx-6 text-3xl md:text-4xl font-extrabold text-slate-800">
              My Notes
            </div>
            <UserButton />
          </div>
        </div>
        <Separator className="my-8" />

        {notes.length === 0 && (
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-slate-500">
              You have no notes yet
            </h2>
          </div>
        )}

        {/* all notes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <CreateNoteDialog />
          {notes.map((note) => {
            return (
              <Link href={`/notebook/${note.id}`} key={note.id}>
                <div className="border border-stone-300 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1">
                  <Image
                    width={400}
                    height={200}
                    src={note.imageUrl || ""}
                    alt={note.name}
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-slate-700">
                      {note.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
