"use client";

import { createpost, sendMassage } from "@/actions/actions";
import { useState, useTransition } from "react";

export default function CreateUser({ userEmail }: { userEmail: string }) {
  const [isPending, startTransition] = useTransition();

  async function createU() {
    startTransition(async () => {
      await sendMassage();
    });
  }

  return (
    <div className="flex ">
      <div
        onClick={() => createU()}
        className="text-bold hover:bg-blue-100  cursor-pointer  "
      >
        Create user
      </div>
      <div className=" flex items-center gap-4 ">
        {/* <input
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
        /> */}
      </div>
    </div>
  );
}
