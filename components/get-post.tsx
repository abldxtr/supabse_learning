"use client";

import { supabase } from "@/utils/supabase/supa-page";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export type posts = {
  id: string;
  title: string;
  content: string;
  userEmail: string;
};

export default function Posts() {
  const [posts, setPosts] = useState<posts[]>([]);

  const { data, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("/api/posts");
      const posts = await res.json();
      console.log(posts.data);
      setPosts(posts.data);
      return posts.data;
    },
  });

  const channel = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "Post",
      },
      (payload) => {
        console.log(payload);
        let newPayload = payload.new as posts;
        setPosts((prev) => [...prev, newPayload]);
      }
    )
    .on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "Post",
      },
      (payload) => {
        // console.log("delteeeee");
        console.log(payload);
        let newPayload = posts.filter((item) => item.id != payload.old.id);
        setPosts(newPayload);
      }
    )

    .subscribe();

  if (isPending) {
    return <div>isloading... posts</div>;
  }

  return (
    <div>
      {posts?.map((item, index) => {
        return (
          <div className="flex items-center gap-x-3" key={index}>
            <div>{item.content} </div>
            <div> {item.userEmail} </div>
          </div>
        );
      })}
    </div>
  );
}
