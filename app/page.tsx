"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { FullPageLoader } from "@/components/ui/Loading";

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) router.replace(user ? "/chats" : "/login");
  }, [loading, router, user]);

  return <FullPageLoader label="Đang mở MiniChat..." />;
}
