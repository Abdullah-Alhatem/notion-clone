// import RoomProvider from "@/components/RoomProvider";
// import { auth } from "@clerk/nextjs/server";

// async function DocLayout({
//   children,
//   params: { id },
// }: {
//   children: React.ReactNode;
//   params: {
//     id: string;
//   };
// }) {
//   await auth.protect();


//   return <RoomProvider roomId={id}>{children}</RoomProvider>;
// }
// export default DocLayout;

import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

interface DocLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
}

async function DocLayout({
  children,
  params,
}: DocLayoutProps) {
  // Await the params object to get the id
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  await auth.protect();

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

export default DocLayout;