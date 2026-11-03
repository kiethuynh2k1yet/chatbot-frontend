"use client";

import { useEffect } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import { useAuth } from "./useAuth";

export function usePresence() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    let disposed = false;
    const supabase = getSupabaseClient();

    const updatePresence = async (online: boolean) => {
      const { error } = await supabase
        .from("profiles")
        .update({ is_online: online, last_seen_at: new Date().toISOString() })
        .eq("id", user.id);
      if (error && !disposed) {
        console.error("Không thể cập nhật trạng thái online:", error.message);
      }
    };

    void updatePresence(true);
    const heartbeat = window.setInterval(() => {
      if (document.visibilityState === "visible") void updatePresence(true);
    }, 60_000);
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") void updatePresence(true);
    };
    const onPageHide = () => {
      void updatePresence(false);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      disposed = true;
      window.clearInterval(heartbeat);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onPageHide);
      void supabase
        .from("profiles")
        .update({ is_online: false, last_seen_at: new Date().toISOString() })
        .eq("id", user.id)
        .then(({ error }) => {
          if (error) console.error("Không thể đặt trạng thái offline:", error.message);
        });
    };
  }, [user]);
}
