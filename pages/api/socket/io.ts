// import { supabase } from "@/utils/supabase/server";
// import { createClient } from "@/utils/supabase/server";
import { supabase } from "@/utils/supabase/supa-page";

import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

// import { NextApiResponseServerIo } from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = async (req: NextApiRequest, res: any) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    // const supabase = await createClient();

    supabase
      .channel("online1")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "User",
        },
        (event: any) => {
          console.log({ event });
          //   io.emit("aaaa", { data: event.new.name });

          // revalidatePath("/");
        }
      )
      .subscribe();
    // اینجا رویدادهای تایپ را تعریف می‌کنیم
    io.on("connection", (socket) => {
      console.log("A user connected");

      // دریافت رویداد isTyping
      socket.on("isTyping", (data) => {
        console.log(`${data.userId} is typing...`);
        // ارسال وضعیت تایپ به سایر کاربران در همان چت
        io.emit("typing", { isTyping: true, userId: data.userId });
      });

      // دریافت رویداد stopTyping
      socket.on("stopTyping", (data) => {
        console.log(`${data.userId} stopped typing`);
        // ارسال وضعیت توقف تایپ به سایر کاربران
        io.emit("stoptype", { isTyping: false, userId: data.userId });
      });

      io.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });
    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
