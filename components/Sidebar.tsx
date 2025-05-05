"use client";

import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import MyDocs from "./MyDocs";


function Sidebar() {


  return (
    <div className="p-1 sm:p-2 md:p-5 bg-gray-200 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger className="flex flex-row items-center w-full ">
            <MenuIcon className=" p-2 hover:opacity-30 rounded-lg" size={40} />
            <p className="min-[450px]:hidden hover:opacity-30 font-medium">Other Documents</p>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div><MyDocs/></div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:inline"><MyDocs/></div>
    </div>
  );
}
export default Sidebar;
