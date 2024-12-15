// "use client";

import { sendMassage } from "@/actions/actions";
import db from "@/lib/prisma";
// import { supabase } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

export default async function Home() {
  // const user = await db.user.create({
  //   data: {
  //     email: "aboldexter@gmail.com",
  //     name: "abldxtr",
  //   },
  // });
  // console.log(user);

  // const [data, setData] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState<any>(null);

  // useEffect(() => {
  //   // Fetch the current session and set the user
  //   const fetchUser = async () => {
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession();
  //     setUser(session?.user);
  //   };

  //   fetchUser();
  // }, []);

  // useEffect(() => {
  //   if (user) {
  //     fetchWorkouts();
  //   }
  // }, [user]);

  // const fetchWorkouts = async () => {

  // setLoading(true);
  // const { data, error } = await supabase.from("User").select("*");

  // const a = await supabase
  //   .channel("online1")
  //   .on(
  //     "postgres_changes",
  //     {
  //       event: "*",
  //       schema: "public",
  //       table: "User",
  //     },
  //     (payload: any) => {
  //       console.log({ payload });
  //       // revalidatePath("/");
  //     }
  //   )
  //   .subscribe();

  // const channels = supabase.getChannels();

  // console.log({ data, channels });

  // if (error) throw error;
  // setData(data);

  // };
  // fetchWorkouts();

  return (
    <div className="text-bold flex flex-col ">
      {/* {data?.map((item, index) => (
        <div key={index}>
          {index} {item.name}
        </div>
      ))} */}
      <div className="text-bold" onClick={sendMassage}>
        Hello world!
      </div>
    </div>
  );
}
