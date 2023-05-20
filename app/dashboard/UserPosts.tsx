"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { AuthPosts } from "../types/AuthPosts";
import Loading from "../components/Loading";
import EditPosts from "./EditPosts";

const fetchAuthData = async () => {
  const res = await axios.get("/api/posts/getAuthPosts");
  return res.data;
};

const UserPosts = () => {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchAuthData,
    queryKey: ["get-auth-posts"],
  });
  if (isLoading) return <Loading />;
  console.log(data);
  return (
    <div>
      {data?.posts?.map((post) => (
        <EditPosts
          comments={post?.comments}
          key={post.id}
          id={post.id}
          name={data?.name}
          image={data?.image}
          title={post.title}
        />
      ))}
    </div>
  );
};

export default UserPosts;
