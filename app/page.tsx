// "use client";

import { sendMassage } from "@/actions/actions";
import UserList, { user } from "@/components/user-list";

export default function Home() {
  return (
    <div className="text-bold flex flex-col ">
      <UserList />
      <div className="text-bold" onClick={sendMassage}>
        Hello world!
      </div>
    </div>
  );
}
