// "use client";

import { sendMassage } from "@/actions/actions";
import CreatePost from "@/components/create-post";
import CreateUser from "@/components/create-user";
import Posts from "@/components/get-post";
import SignOut from "@/components/sign-out";
import UserList from "@/components/user-list";
import db from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const posts = await db.post.findMany({
  //   where: {
  //     userEmail: user?.email,
  //   },
  // });
  // const users = await db.user.findMany();

  return (
    <>
      <div className=" fixed top-2 right-2 ">
        <SignOut />
      </div>

      <div className="text-bold flex flex-col ">
        {/* <UserList /> */}
        <div className="flex ">
          {/* <div
            className="text-bold hover:bg-blue-100 flex cursor-pointer  "
            onClick={async () => {
              await sendMassage();
            }}
          >
            create User
          </div> */}
          <CreateUser userEmail={user?.email!} />
        </div>
        <div className="block">
          {/* <CurrentUser /> */}
          {user?.email}
        </div>
        <div>posts:</div>
        <div className="flex flex-col">
          <CreatePost userEmail={user?.email!} />
          {/* client side */}
          <Posts />

          {/* server side  */}
          {/* {posts.map((item, index) => {
            return (
              <div className="flex items-center gap-x-3" key={index}>
                <div>{item.content} </div>
                <div> {item.userEmail} </div>
              </div>
            );
          })} */}
        </div>
      </div>
    </>
  );
}
