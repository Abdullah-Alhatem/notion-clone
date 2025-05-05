/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { exitDocument } from "@/actions/actions";
import { toast } from "sonner";
import { LogOut, Trash2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";

function ExitDocument() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const handleDelete = async () => {
    const roomId = pathname.split("/").pop();
    if (!roomId) return;

    startTransition(async () => {
      const { success } = await exitDocument(
        roomId,
        user?.emailAddresses[0].toString()!
      );

      if (success) {
        setIsOpen(false);
        router.replace("/");
        toast.success("Exited room successfully!");
      } else {
        toast.error("Failed to exit room!");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        asChild
        variant="destructive"
        className="p-2 flex justify-center items-center gap-1"
      >
        <DialogTrigger>
        <LogOut size={16} />
          Exit
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to Exit?</DialogTitle>
          <DialogDescription>
            You will exit the document and ending the collaboration session with
            other users.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Exiting..." : "Exit"}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default ExitDocument;
