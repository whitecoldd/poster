"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Posts = ({ image, name, postTitle, id, comments }: any) => {
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          src={image}
          width={32}
          height={32}
          className="rounded-full"
          alt="ava"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-words">{postTitle}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} comments
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Posts;
