"use client";

import axios from "axios";
import Post from "./components/Post";
import { useQuery } from "@tanstack/react-query";
import Posts from "./components/Posts";
import Loading from "./components/Loading";
import { PostType } from "./types/Posts";

const posts = async () => {
  const res = await axios.get("/api/posts/getPosts");
  return res.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: posts,
    queryKey: ["posts"],
  });
  if (error) return error;
  if (isLoading) return <Loading />;
  return (
    <main>
      <Post />
      {data?.map((post: any) => (
        <Posts
          comments={post.comments}
          key={post.id}
          id={post.id}
          name={post.user.name}
          image={post.user.image}
          postTitle={post.title}
        />
      ))}
    </main>
  );
}
