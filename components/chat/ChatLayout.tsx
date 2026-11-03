"use client";

import type { ReactNode } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";

export const AppShell = styled.div`
  display: flex;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background: #f0f2f5;
`;

const Main = styled.main<{ $hasConversation: boolean }>`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  background: #f6f7f9;

  @media (max-width: 767px) {
    display: ${({ $hasConversation }) => ($hasConversation ? "flex" : "none")};
  }
`;

export const ChatPanel = styled.section`
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
`;

const Welcome = styled.div`
  display: grid;
  flex: 1;
  align-content: center;
  justify-items: center;
  padding: 32px;
  color: #8290a3;
  text-align: center;

  h1 {
    margin: 20px 0 8px;
    color: #263248;
    font-size: 19px;
    font-weight: 650;
  }

  p {
    max-width: 320px;
    margin: 0;
    font-size: 13px;
    line-height: 1.7;
  }
`;

const WelcomeIcon = styled.div`
  display: grid;
  width: 74px;
  height: 74px;
  place-items: center;
  border: 1px solid #e8edf3;
  border-radius: 24px;
  color: #0068ff;
  background: #fff;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
  font-size: 27px;
`;

export default function ChatLayout({
  children,
  conversationId,
}: {
  children?: ReactNode;
  conversationId?: string;
}) {
  return (
    <AppShell>
      <Sidebar selectedConversationId={conversationId} />
      <Main $hasConversation={Boolean(conversationId)}>
        {children ?? (
          <Welcome>
            <WelcomeIcon>✦</WelcomeIcon>
            <h1>Chọn một cuộc trò chuyện</h1>
            <p>
              Tìm bạn bè qua tên hoặc email, rồi gửi tin nhắn đầu tiên của bạn.
            </p>
          </Welcome>
        )}
      </Main>
    </AppShell>
  );
}
