"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatLayout from "@/components/chat/ChatLayout";
import { FullPageLoader } from "@/components/ui/Loading";
import { useAuth } from "@/hooks/useAuth";
import ErrorMessage from "@/components/ui/ErrorMessage";
import styled from "styled-components";

const ErrorPanel = styled.div`
  width: min(440px, calc(100% - 32px));
  margin: auto;
`;

export default function ChatsPage() {
  const router = useRouter();
  const { user, loading, authError } = useAuth();

  useEffect(() => {
    if (!loading && !user && !authError) router.replace("/login");
  }, [authError, loading, router, user]);

  if (loading) return <FullPageLoader label="Đang mở MiniChat..." />;
  if (authError) {
    return (
      <ErrorPanel>
        <ErrorMessage>{authError}</ErrorMessage>
      </ErrorPanel>
    );
  }
  if (!user) return <FullPageLoader label="Đang chuyển đến đăng nhập..." />;
  return <ChatLayout />;
}
