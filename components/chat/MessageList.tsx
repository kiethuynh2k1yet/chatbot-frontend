"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";
import type { Message } from "@/types/message";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ErrorMessage from "@/components/ui/ErrorMessage";

const Viewport = styled.div`
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
  padding: 21px clamp(16px, 5vw, 64px) 18px;
  scroll-behavior: smooth;
`;

const DayLabel = styled.div`
  align-self: center;
  margin: 1px 0 20px;
  padding: 6px 11px;
  border-radius: 20px;
  color: #8793a5;
  background: rgba(255, 255, 255, 0.74);
  font-size: 11px;
`;

const MessageStack = styled.div`
  display: grid;
  gap: 5px;
`;

const Empty = styled.div`
  display: grid;
  flex: 1;
  align-content: center;
  justify-items: center;
  gap: 8px;
  color: #8390a3;
  font-size: 13px;
  text-align: center;

  strong {
    color: #475569;
    font-size: 14px;
    font-weight: 600;
  }
`;

export default function MessageList({
  messages,
  ownUserId,
  isTyping,
  error,
}: {
  messages: Message[];
  ownUserId: string;
  isTyping: boolean;
  error: string | null;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, isTyping]);

  return (
    <Viewport ref={viewport} aria-label="Tin nhắn">
      <DayLabel>Hôm nay</DayLabel>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {messages.length ? (
        <MessageStack>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              mine={message.sender_id === ownUserId}
            />
          ))}
        </MessageStack>
      ) : (
        <Empty>
          <strong>Bắt đầu cuộc trò chuyện</strong>
          <span>Gửi lời chào đầu tiên cho người bạn này nhé.</span>
        </Empty>
      )}
      {isTyping && <TypingIndicator />}
      <div ref={bottom} />
    </Viewport>
  );
}
