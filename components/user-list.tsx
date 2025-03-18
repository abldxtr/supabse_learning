"use client";

import { currentUser, deleteMessage } from "@/actions/actions";
import { supabase } from "@/utils/supabase/supa-page";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export type user = {
  email: string;
  id: number;
  name: string;
  password: string;
};

export default function UserList({ user }: { user?: user }) {
  const [state, setState] = useState<user[]>([]);
  const { isPending, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/users").then((res) => res.json());
      setState(res);
      // console.log(res);
      return res;
    },
  });

  async function deleteUser(id: number) {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
  }
  const channel = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "User",
      },
      (payload) => {
        // console.log(payload);
        let newPayload = payload.new as user;
        setState((prev) => [...prev, newPayload]);
      }
    )
    .on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "User",
      },
      (payload) => {
        // console.log("delteeeee");
        // console.log(payload);
        let newPayload = state.filter((item) => item.id != payload.old.id);
        setState(newPayload);
      }
    )

    .subscribe();

  if (isPending) {
    return <div>loading...</div>;
  }
  if (!data) {
    return null;
  }

  return (
    <div>
      {state.map((item, index) => {
        return (
          <div className="flex items-center gap-x-4 " key={index}>
            <div>{item.email}</div>
            <div
              className="text-red-500 font-bold cursor-pointer "
              onClick={() => {
                // deleteMessage(item.id);
                deleteUser(item.id);
              }}
            >
              Delete
            </div>
          </div>
        );
      })}
      {/* <div>//////////////////////////////////</div>
      {data?.map((item: any, index: number) => {
        return <div key={index}>{item.email}</div>;
      })} */}
      {/* {user.email} */}
    </div>
  );
}

// export function CurrentUser() {
//   async function getUser() {
//     const user = await currentUser();
//     // console.log({ user });
//   }

//   return <div onClick={() => getUser()}>get current user</div>;
// }
