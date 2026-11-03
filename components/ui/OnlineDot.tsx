"use client";

import styled from "styled-components";

const Dot = styled.span<{ $online: boolean }>`
  display: inline-block;
  width: 11px;
  height: 11px;
  flex: 0 0 auto;
  border: 2px solid #fff;
  border-radius: 50%;
  background: ${({ $online, theme }) =>
    $online ? theme.colors.success : "#94A3B8"};
`;

export default function OnlineDot({ online }: { online: boolean }) {
  return <Dot $online={online} aria-label={online ? "Đang hoạt động" : "Ngoại tuyến"} />;
}
