"use client";

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import { PointerEvent } from "react";
import FollowPointer from "./FollowPointer";

function LiveCursorProvider({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [MyPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    // Update from ClientX and ClientY to PageX and PageY for full page cursor tracking
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
    updateMyPresence({ cursor });
  }

  function handlePointerLeave() {
    updateMyPresence({ cursor: null });
  }

  return (
    <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      {others
        .filter(others => others.presence.cursor !== null)
        .map(({ connectionId, presence, info }) => (
          <FollowPointer
            key={connectionId}
            info={info}
            x={presence.cursor!.x}
            y={presence.cursor!.y}
          />
        ))}
        {children}
    </div>
  );
}
export default LiveCursorProvider;
