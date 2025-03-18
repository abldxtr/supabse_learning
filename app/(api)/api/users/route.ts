// import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import db from "@/lib/prisma";
// import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  // const ss = request.nextUrl.searchParams
  // ss.set("aa","11")

  //   const token_hash = searchParams.get("token_hash");
  //   const type = searchParams.get("type") as EmailOtpType | null;
  //   const next = searchParams.get("next") ?? "/";

  //   if (token_hash && type) {
  const supabase = await createClient();
  // const { data, error: err } = await supabase.from("User").select("*");
  const data = await db.user.findMany();

  // console.log({ data });
  // console.log({ err });

  // if (!data) {
  //   const res = await db.user.findMany();
  //   // console.log({ res });
  //   // return Response.json(res);
  // }
  // console.log(data);

  return Response.json(data);
}

export async function POST(request: NextRequest) {
  const { id } = await request.json();
  console.log({ id });

  const supabase = await createClient();
  // const { error } = await supabase.from("User").delete().eq("id", id);
  try {
    await db.user.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }

  // if (error) {
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }

  // return NextResponse.json(
  //   { message: "User deleted successfully" },
  //   { status: 200 }
  // );
}
