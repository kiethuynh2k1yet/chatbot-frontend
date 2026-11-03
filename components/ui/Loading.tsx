"use client";

import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Screen = styled.div`
  display: grid;
  min-height: 100dvh;
  place-content: center;
  justify-items: center;
  gap: 14px;
  color: #64748b;
  font-size: 14px;
`;

const Spinner = styled.span`
  width: 26px;
  height: 26px;
  border: 3px solid #dbeafe;
  border-top-color: #0068ff;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

export function FullPageLoader({ label = "Đang tải..." }: { label?: string }) {
  return (
    <Screen role="status">
      <Spinner />
      {label}
    </Screen>
  );
}
