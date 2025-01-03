/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await auth.protect();

  const { sessionClaims } = await auth();
  const { room } = await req.json(); // Through This POST req automatically receive the actual room "inside req.json()" From <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}>

  const session = liveblocks.prepareSession(sessionClaims?.email!, {
    userInfo: {
      name: sessionClaims?.fullName!,
      email: sessionClaims?.email!,
      avatar: sessionClaims?.image!,
    },
  });
  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email)
    .get();

  const userInRoom = usersInRoom.docs.find(doc => doc.id === room);

  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();
    return new Response(body, { status });
  } else {
    return NextResponse.json(
      { message: "You are not in this room" },
      { status: 403 }
    );
  }
}
