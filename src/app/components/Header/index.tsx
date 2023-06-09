"client side";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <>
      <header>
        <Link href="/">Home</Link>
        <Link href="/auth/login">login</Link>
        <Link href="/dashboard">dashboard</Link>
        {session?.user ? (
          <>
            <p>{session.user.name}</p>
            <button onClick={() => signOut()}>Sign Out</button>
          </>
        ) : (
          <button onClick={() => signIn()}>Sign In</button>
        )}
      </header>
    </>
  );
}
