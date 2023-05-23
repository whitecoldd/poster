"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

import React from "react";

interface PostProps {
  id?: string;
}

interface Comment {
  title: string;
  postId?: string;
}

const Comment = ({ id }: PostProps) => {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [toastId, setToastId] = useState("");
  const query = useQueryClient();
  const { mutate } = useMutation(
    async (data: Comment) => axios.post(`/api/posts/addComment`, { data }),
    {
      onSuccess: (data) => {
        setIsDisabled(false);
        setTitle("");
        setToastId(toast.success("commented successfully", { id: toastId }));
      },
      onError: (err) => {
        if (err instanceof AxiosError)
          setToastId(toast.error(err?.response?.data.message, { id: toastId }));
        setIsDisabled(false);
        query.invalidateQueries(["post-details"]);
      },
      onMutate: (load) => {
        setToastId(toast.loading("commenting...", { id: toastId }));
      },
    }
  );
  const onComment = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title: title, postId: id });
    setIsDisabled(true);
  };
  return (
    <form className="my-8" onSubmit={onComment}>
      <h3>comment here.</h3>
      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="flex items-center justify-start gap-4">
        <button
          className="text-sm bg-cyan-400 text-white py-2 px-4 rounded-xl disabled:opacity-25"
          type="submit"
          disabled={isDisabled}
        >
          comment.
        </button>
        <p
          className={`font-bold text-sm ${
            title?.length > 300 ? "text-red-600" : "text-slate-800"
          }`}
        >{`${title?.length}/300`}</p>
      </div>
    </form>
  );
};

export default Comment;
