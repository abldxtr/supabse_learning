"use server";

import db from "@/lib/prisma";
import { supabase } from "@/utils/supabase/server";
import { faker } from "@faker-js/faker";

export async function sendMassage() {
  // Create the message
  const message = await db.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
    },
  });

  // const message = await supabase
  //   .from("User")
  //   .insert({ email: faker.internet.email(), name: faker.person.fullName() });

  console.log({ message });
}
