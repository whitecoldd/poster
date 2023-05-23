"use client";

import Posts from "@/app/components/Posts";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostType } from "@/app/types/Post";
import Loading from "@/app/components/Loading";
import Comment from "@/app/components/Comment";
import Image from "next/image";

type URL = {
  params: { slug: string };
};

const fetchPost = async (slug: string) => {
  const res = await axios.get(`/api/posts/${slug}`);
  return res.data;
};

const PostDetails = (url: URL) => {
  const { data, isLoading } = useQuery<PostType>({
    queryKey: ["post-details"],
    queryFn: () => fetchPost(url.params.slug),
  });
  if (isLoading) return <Loading />;
  if (data) console.log(data);

  return (
    <div>
      <Posts
        id={data?.id}
        name={data?.user.name}
        image={data?.user.image}
        postTitle={data?.title}
        comments={data?.comments}
      />
      <Comment id={data?.id} />
      {data?.comments?.map((com) => {
        //@ts-ignore
        let datetimeValue = new Date(com.createdAt);
        const formattedDateTime = datetimeValue.toLocaleString("en-GB", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        return (
          <div className="my-6 bg-white p-8 rounded-md" key={com.id}>
            <div className="flex items-center gap-2">
              <Image
                src={com.user.image}
                alt={com.user.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <h3 className="font-bold">{com.user.name}</h3>
              <h2 className="text-sm">{formattedDateTime}</h2>
            </div>
            <div className="py-4">{com.comment}</div>
          </div>
        );
      })}
    </div>
  );
};

export default PostDetails;
