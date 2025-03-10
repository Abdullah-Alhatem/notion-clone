"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";

function Header() {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between p-5">
      {user && (
        <h1 className="text-2xl">
          {user?.firstName}
          {`'s`} Space
        </h1>
      )}

      {/* Breadcrumbs */}
      <Breadcrumbs />

      <div>
        <SignedOut>
          <div className="hover:bg-gray-800 hover:text-white hover:shadow-md hover:shadow-gray-500 hover:translate-y-px transition delay-100 duration-300 ease-in-out rounded-md p-1 shadow-md shadow-gray-300">
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
export default Header;
