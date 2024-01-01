import TypewriterTitle from "@/components/TypewriterTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen dashboard-bg bg-cover bg-gradient-to-tl from-sky-100 via-fuchsia-100 to-violet-100">
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="font-bold text-6xl text-slate-800 text-center w-3/4">
          AI <span className="text-cyan-500 font-extrabold">note taking</span>{" "}
          assistant
        </h1>
        <h2 className="mt-4 mb-8 font-semibold text-2xl text-slate-600">
          <TypewriterTitle />
        </h2>
        <Link href="/dashboard">
          <Button className="bg-cyan-900">
            Get started
            <ArrowRight className="ml-2 w-5 h-5" strokeWidth={2} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
