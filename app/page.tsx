"use client"
import NewDocumentButton from "@/components/NewDocumentButton";
import Sidebar from "@/components/Sidebar";
import { ArrowLeftCircle, FileText, MenuIcon, Share2 } from "lucide-react";

import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import {
  collectionGroup,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import SidebarOption from "@/components/SidebarOption";


interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

export default function Home() {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });

  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;

        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData,
          });
        }
        return acc;
      },
      {
        owner: [],
        editor: [],
      }
    );
    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton />

      <div className="flex py-4 flex-col space-y-4 md:max-w-36">
        {/* My Documents */}
        {groupedData.owner.length === 0 ? (
          <h2 className="text-gray-500 font-semibold text-sm">
            No documents found
          </h2>
        ) : (
          <>
            <h2 className="text-gray-500 font-semibold text-sm flex gap-1 items-center justify-center ">
            <FileText></FileText>My Documents
            </h2>
            {groupedData.owner.map(doc => (
              <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
            ))}
          </>
        )}

        {/* Shared with me */}
        {groupedData.editor.length > 0 && (
          <>
            <h2 className="text-gray-500 font-semibold text-sm flex gap-1 items-center justify-center">
              <Share2 ></Share2>Shared with Me
            </h2>
            {groupedData.editor.map(doc => (
              <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
            ))}
          </>
        )}
      </div>
    </>
  );

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
        <div className=" p-4 px-10 shadow-lg shadow-xl/20 inset-shadow ">{menuOptions}</div>
      </div>
    </main>
  );
}
