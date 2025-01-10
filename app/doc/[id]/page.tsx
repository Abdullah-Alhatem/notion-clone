"use client";

import Document from "@/components/Document";

function DocumentPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div className="flex flex-1 flex-col min-h-screen">
      <Document id={id} />
    </div>
  );
}
export default DocumentPage;






// ------------------------------------- حل لمشكله next.js 15 ---------------------------------------------
// "use client";
// import React from "react"; // تأكد من استيراد React
// import Document from "@/components/Document";

// function DocumentPage({
//   params,
// }: {
//   params: {
//     id: string;
//   };
// }) {
//   // تحويل params إلى Usable<{ id: string }> باستخدام React.use
//   const unwrappedParams = React.use<{ id: string }>(Promise.resolve(params));
//   const { id } = unwrappedParams; // استخراج id من params المفكوكة

//   return (
//     <div className="flex flex-1 flex-col min-h-screen">
//       <Document id={id} />
//     </div>
//   );
// }

// export default DocumentPage;
