"use client";

import { signout } from "@/actions/actions";
import { supabase } from "@/utils/supabase/supa-page";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function SignOut() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="text-bold  ">
      <div
        className="text-bold flex items-center "
        onClick={() => {
          startTransition(async () => {
            signout();
            router.refresh();
          });
        }}
      >
        <div>Sign out</div>
        {isPending && <div>...loading</div>}
      </div>
    </div>
  );
}
