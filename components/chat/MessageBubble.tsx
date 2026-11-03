"use client";

import styled, { keyframes } from "styled-components";
import type { Message } from "@/types/message";
import { formatTime } from "@/lib/utils";

const appear = keyframes`
  from { opacity: 0; transform: translateY(7px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Row = styled.div<{ $mine: boolean }>`
  display: flex;
  justify-content: ${({ $mine }) => ($mine ? "flex-end" : "flex-start")};
  padding: 3px 0;
  animation: ${appear} 0.2s ease both;
`;

const Content = styled.div<{ $mine: boolean }>`
  max-width: min(75%, 600px);

  @media (min-width: 1024px) {
    max-width: 55%;
  }
`;

const Bubble = styled.div<{ $mine: boolean }>`
  padding: 10px 14px;
  border-radius: ${({ $mine }) =>
    $mine ? "18px 18px 5px 18px" : "18px 18px 18px 5px"};
  color: ${({ $mine }) => ($mine ? "#fff" : "#1e293b")};
  background: ${({ $mine }) => ($mine ? "#0068ff" : "#fff")};
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.055);
  font-size: 14px;
  line-height: 1.55;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
`;

const Time = styled.time<{ $mine: boolean }>`
  display: block;
  margin: 5px 4px 0;
  color: #a0a9b7;
  font-size: 11px;
  text-align: ${({ $mine }) => ($mine ? "right" : "left")};
`;

export default function MessageBubble({
  message,
  mine,
}: {
  message: Message;
  mine: boolean;
}) {
  return (
    <Row $mine={mine}>
      <Content $mine={mine}>
        <Bubble $mine={mine}>{message.content}</Bubble>
        <Time dateTime={message.created_at} $mine={mine}>
          {formatTime(message.created_at)}
        </Time>
      </Content>
    </Row>
  );
}
