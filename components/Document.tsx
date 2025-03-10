"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import Avatars from "./Avatars";

function Document({ id }: { id: string }) {
  const [data] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const isOwner = useOwner();

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };

  return (
    <div className="flex-1 h-full bg-white p-2 sm:p-5">
      <div className="flex max-w-6xl mx-auto justify-between pb-5">
        <form className="flex flex-1 flex-col gap-2 sm:space-x-2 sm:flex-row sm:gap-0 " onSubmit={updateTitle}>
          <div className="flex flex-1 gap-1">
            <Input value={input} onChange={e => setInput(e.target.value)} />
            <Button disabled={isUpdating} type="submit">
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          </div>
          <div className="flex justify-end sm:justify-normal gap-1">
            {isOwner && (
              <>
                {/* InviteUser */}
                <InviteUser />
                {/* DeleteDocument */}
                <DeleteDocument />
              </>
            )}
          </div>
        </form>
      </div>

      <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
        <ManageUsers />
        <Avatars />
      </div>

      <hr className=" pb-5 sm:pb-10" />

      <Editor />
    </div>
  );
}
export default Document;
