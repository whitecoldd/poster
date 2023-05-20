"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
const Post = () => {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostID: string;

  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (err) => {
        if (err instanceof AxiosError) {
          toastPostID = toast.error(err?.response?.data.message, {
            id: toastPostID,
          });
        }
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        toastPostID = toast.success("posted successfully", { id: toastPostID });
        queryClient.invalidateQueries(["posts"]);
        setTitle(""), setIsDisabled(false);
      },
      onMutate: (load) => {
        toastPostID = toast.loading("posting...", { id: toastPostID });
      },
    }
  );
  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="tell us something"
          className="p-4 text-lg rounded-md my-2 bg-gray-200 w-full"
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-600" : "text-gray-400"
          }`}
        >{`${title.length}/300`}</p>
        <button
          className="text-sm bg-cyan-400 text-white py-2 px-4 rounded-xl disabled:opacity-25"
          type="submit"
          disabled={isDisabled}
        >
          post
        </button>
      </div>
    </form>
  );
};

export default Post;
