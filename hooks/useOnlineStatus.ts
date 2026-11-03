"use client";

import { useEffect, useState } from "react";
import { isProfileOnline } from "@/lib/utils";
import type { Profile } from "@/types/profile";

export function useOnlineStatus(profile: Pick<Profile, "is_online" | "last_seen_at">) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return isProfileOnline(profile.is_online, profile.last_seen_at, now);
}
