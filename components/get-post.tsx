"use client";

import { supabase } from "@/utils/supabase/supa-page";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { postsOptions } from "./server-get-post";

export type posts = {
  id: string;
  title: string;
  content: string;
  userEmail: string;
};

export default function Posts() {
  const [posts, setPosts] = useState<posts[]>([]);

  // const { data, isPending } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: async () => {
  //     const res = await fetch("/api/posts");
  //     const posts = await res.json();
  //     //   console.log(posts.data);
  //     setPosts(posts.data);
  //     return posts.data;
  //   },
  // });
  const { data } = useSuspenseQuery(postsOptions);
  const queryClient = useQueryClient();

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
        console.log("post insert");

        console.log(payload);
        let newPayload = payload.new as posts;
        setPosts((prev) => [...prev, newPayload]);

        let newPost = payload.new as posts;

        queryClient.setQueryData(["posts"], (oldData: any) => {
          console.log({ oldData });
          if (!oldData) return { data: [newPost] };
          return { data: [...oldData.data, newPost] };
        });

        // queryClient.setQueryData(["posts"], (oldData: any) => {
        //   if (!oldData) return [newPost];
        //   return [...oldData.data, newPost];
        // });
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
        console.log("delteeeee");
        console.log(payload);
        let newPayload = posts.filter((item) => item.id != payload.old.id);
        setPosts(newPayload);
      }
    )

    .subscribe();

  // if (isPending) {
  //   return <div>isloading... posts</div>;
  // }

  return (
    <div>
      {data.data.map((item: posts, index: number) => {
        return (
          <div className="flex items-center gap-x-3" key={index}>
            <div>{item.content} </div>
            <div> {item.userEmail} </div>
          </div>
        );
      })}
      <div>server</div>
      {/* <div> {JSON.stringify(data)} </div> */}
    </div>
  );
}
