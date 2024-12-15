"use server";

import db from "@/lib/prisma";
// import { supabase } from "@/utils/supabase/server";
import { faker } from "@faker-js/faker";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function sendMassage() {
  // Create the message
  const message = await db.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: "1234567",
    },
  });
  // revalidatePath("/");
  // redirect("/");

  // const message = await supabase
  //   .from("User")
  //   .insert({ email: faker.internet.email(), name: faker.person.fullName() });

  // console.log({ message });
}
