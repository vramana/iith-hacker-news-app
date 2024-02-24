import type { Session } from "next-auth/core/types";
import Link from "next/link";
import React from "react";

type OwnProps = {
  session: Session | null;
};

export const Navbar = (props: OwnProps) => {
  const { session } = props;

  return (
    <nav className="flex justify-between bg-orange-400 p-2 px-10">
      <div className="flex gap-2">
        <Link href="/">Y Hacker News</Link>
        <Link href="/submit">| Post</Link>
      </div>
      <div className="flex items-center gap-4">
        <div>{session?.user?.name}</div>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="text-sm"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </nav>
  );
};
