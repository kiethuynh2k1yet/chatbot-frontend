"use client";

import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 60%, 100% { transform: translateY(0); opacity: .45; }
  30% { transform: translateY(-4px); opacity: 1; }
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 4px 0 8px;
`;

const Dots = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 13px;
  border-radius: 17px 17px 17px 5px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);

  i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #94a3b8;
    animation: ${bounce} 1s infinite ease-in-out;
  }

  i:nth-child(2) {
    animation-delay: 0.14s;
  }

  i:nth-child(3) {
    animation-delay: 0.28s;
  }
`;

const Label = styled.span`
  color: #94a3b8;
  font-size: 11px;
`;

export default function TypingIndicator() {
  return (
    <Wrap aria-label="Người kia đang soạn tin nhắn">
      <Dots aria-hidden="true">
        <i />
        <i />
        <i />
      </Dots>
      <Label>Đang soạn...</Label>
    </Wrap>
  );
}
