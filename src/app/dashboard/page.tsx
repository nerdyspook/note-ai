import CreateNoteDialog from "@/components/CreateNoteDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

export default function DashboardPage({}: Props) {
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

        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-500">
            You have no notes yet
          </h2>
        </div>

        {/* all notes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <CreateNoteDialog />
        </div>
      </div>
    </div>
  );
}
