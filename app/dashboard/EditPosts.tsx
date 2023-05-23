"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Toggle from "./Toggle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

type EditProps = {
  title: string;
  id: string;
  name: string;
  image: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

const EditPosts = ({ image, name, title, comments, id }: EditProps) => {
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();
  const [deleteToastID, setDeleteToastID] = useState("");
  const { mutate } = useMutation(
    async (id: string) => await axios.delete(`/api/posts/deletePost?id=${id}`),
    {
      onError: (error) => {
        console.log(error);
        setDeleteToastID(
          toast.error("error occured while deleting your post", {
            id: deleteToastID,
          })
        );
        console.log(error);
      },
      onSuccess: (data) => {
        setDeleteToastID(
          toast.success("deleted successfully", {
            id: deleteToastID,
          })
        );
        queryClient.invalidateQueries(["get-auth-posts"]);
      },
      onMutate: (load) => {
        setDeleteToastID(toast.loading("deleting...", { id: deleteToastID }));
      },
    }
  );
  const onDelete = () => {
    mutate(id);
  };
  return (
    <>
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
          <p className="break-words">{title}</p>
        </div>
        <div className="flex gap-4 cursor-pointer items-center">
          <Link href={`/post/${id}`}>
            <p className="text-sm font-bold text-gray-700">
              {comments?.length} comments
            </p>
          </Link>
          <button
            className="text-sm font-bold text-red-500"
            onClick={() => setToggle(true)}
          >
            delete
          </button>
        </div>
      </div>
      {toggle && <Toggle onDelete={onDelete} setToggle={setToggle} />}
    </>
  );
};

export default EditPosts;
