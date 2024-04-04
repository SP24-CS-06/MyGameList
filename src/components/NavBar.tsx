"use client";

import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const userData = useAuth();
  return (
    <nav className="bg-slate-50 dark:bg-card px-12 py-4 flex">
      {userData ? (
        <Link className="ml-auto" href="/profile">
          <Image
            src={userData.picture}
            alt="profile picture"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
      ) : (
        <Link
          href="/login"
          className="ml-auto hover:text-gray-600 dark:hover:text-gray-300"
        >
          Login
        </Link>
      )}
    </nav>
  );
}
