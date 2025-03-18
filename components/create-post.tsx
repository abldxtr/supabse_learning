"use client";

import { createpost } from "@/actions/actions";
import { useState, useTransition } from "react";

export default function CreatePost({ userEmail }: { userEmail: string }) {
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  async function createP() {
    startTransition(async () => {
      if (!title && !content) {
        return;
      }
      await createpost({
        content,
        title,
        userEmail,
      });
      setTitle("");
      setContent("");
    });
  }

  return (
    <div className="flex ">
      <div
        onClick={() => createP()}
        className="text-bold hover:bg-blue-100  cursor-pointer  "
      >
        Create post
      </div>
      <div className=" flex items-center gap-4 ">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
          className=" py-1 bg-gray-200 border-gray-100/80 rounded-sm px-2 "
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="content"
          className=" py-1 bg-gray-200 border-gray-100/80 rounded-sm px-2 "
        />
      </div>
    </div>
  );
}
