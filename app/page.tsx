import Sidebar from "@/components/Sidebar";
import { ArrowLeftCircle } from "lucide-react";
import MyDocs from "@/components/MyDocs";




export default function Home() {

  return (
    <main className="">
        {/* Desktop */}
      <div className="hidden min-[450px]:flex space-x-2 items-center">
        <ArrowLeftCircle className="w-12 h-12 animate-pulse" />
        <h1 className=" font-bold animate-pulse">
          Get started with creating a New Document{" "}
        </h1>
      </div>

        {/* Mobile */}
      <div className="min-[450px]:hidden w-full flex items-center flex-col gap-3">
        <h1 className="font-bold text-center animate-pulse p-3 ">
          Get started with creating a New Document{" "}
        </h1>
        <div className=" p-4 px-10 shadow-lg shadow-xl/20 inset-shadow "><MyDocs/></div>
      </div>
    </main>
  );
}
