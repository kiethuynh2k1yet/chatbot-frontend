"use client";

import styled from "styled-components";
import Image from "next/image";
import { getInitials } from "@/lib/utils";

const colors = ["#DBEAFE", "#FCE7F3", "#E0E7FF", "#D1FAE5", "#FEF3C7"];

const AvatarFrame = styled.div<{ $size: number; $tone: number }>`
  position: relative;
  display: grid;
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  flex: 0 0 auto;
  place-items: center;
  overflow: hidden;
  border-radius: 50%;
  color: #1e3a8a;
  background: ${({ $tone }) => colors[$tone % colors.length]};
  font-size: ${({ $size }) => `${Math.max(11, Math.round($size * 0.31))}px`};
  font-weight: 700;
  letter-spacing: -0.04em;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function Avatar({
  name,
  src,
  size = 44,
}: {
  name: string;
  src?: string | null;
  size?: number;
}) {
  const tone = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return (
    <AvatarFrame $size={size} $tone={tone}>
      {src ? (
        <Image src={src} alt="" width={size} height={size} unoptimized />
      ) : (
        getInitials(name || "Bạn")
      )}
    </AvatarFrame>
  );
}
