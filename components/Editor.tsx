/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";

import { useRoom, useSelf } from "@liveblocks/react";
import { useEffect, useState } from "react";
import * as Y from "yjs"; // a way of storing like the rich text information in like a collaborative fashion
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import stringToColor from "@/lib/stringToColor";
import TranslateDocument from "./TranslateDocument";
import ChatToDocument from "./ChatToDocument";

type EditorProps = {
  doc: Y.Doc;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provider: any;
  darkMode: boolean;
};

function BlockNote({ doc, provider, darkMode }: EditorProps) {
  const userInfo = useSelf(me => me.info); // Extract arbitrary data based on the current user.

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,

      fragment: doc.getXmlFragment("document-store"), // Where exactly in the yDoc are we storing the information (Key:"document-store")
      user: {
        name: userInfo?.name!,
        color: stringToColor(userInfo?.email!),
      },
    },
  });

  return (
    <div className="relative max-w-6xl mx-auto">
      <BlockNoteView
        className="min-h-screen"
        editor={editor}
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}

function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc); // the way we combine our Doc into the Room (storing inside Liveblocks)
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      // whenevre we live the the room we clean that out (Destroy)
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null; // if we don't have a doc or provider we don't render anything
  }

  const style = ` max-[380px]:p-2 max-[380px]:rounded-full hover:text-white ${
    darkMode
      ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
      : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
  }`;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex max-[420px]:justify-end justify-end gap-[6px] mb-5 items-center sm:items-center sm:flex-row sm:justify-end sm:gap-2 sm:mb-10">
        <div className="flex gap-1">
          <TranslateDocument doc={doc} />
          <ChatToDocument doc={doc} />
        </div>
        {/* Dark Mode */}
        <Button className={style} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
      {/* BlockNote */}
      <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
    </div>
  );
}
export default Editor;
