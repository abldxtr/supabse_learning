"use client";

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
      console.log(res);
      return res.data;
    },
    // console.log({ result });
    // const res = await result.json();
  });

  // useEffect(() => {
  //   setState((prev) => [...prev, user]);
  // }, [user]);

  if (isPending) {
    return <div>loading...</div>;
  }
  if (!data) {
    return null;
  }

  return (
    <div>
      {/* {state.map((item, index) => {
        return <div key={index}>{item.email}</div>;
      })} */}
      {data?.map((item: any, index: number) => {
        return <div key={index}>{item.email}</div>;
      })}
      {/* {user.email} */}
    </div>
  );
}
