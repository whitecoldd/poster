"use client";

import Image from "next/image";
import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

type User = { image: string };

const Logged = ({ image }: User) => {
  return (
    <li className="flex gap-8 items-center">
      <button
        className="bg-gray-700 text-sm text-white px-6 py-2 rounded-md"
        onClick={() => signOut()}
      >
        sign out
      </button>
      <Link href={"/dashboard"}>
        <Image width={64} height={64} src={image} alt="img" className="w-14 rounded-full" priority/>
      </Link>
    </li>
  );
};

export default Logged;
