"use client";

import styled, { css } from "styled-components";

const Button = styled.button<{
  $variant?: "primary" | "outline" | "ghost";
  $size?: "small" | "medium";
}>`
  display: inline-flex;
  min-height: ${({ $size }) => ($size === "small" ? "38px" : "46px")};
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: ${({ $size }) => ($size === "small" ? "0 13px" : "0 18px")};
  border: 1px solid
    ${({ $variant, theme }) =>
      $variant === "outline" ? theme.colors.border : "transparent"};
  border-radius: 12px;
  color: ${({ $variant }) => ($variant === "outline" || $variant === "ghost" ? "#334155" : "#fff")};
  background: ${({ $variant, theme }) =>
    $variant === "outline" || $variant === "ghost"
      ? "transparent"
      : theme.colors.primary};
  font-size: 14px;
  font-weight: 650;
  white-space: nowrap;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    background: ${({ $variant, theme }) =>
      $variant === "outline" || $variant === "ghost"
        ? "#F1F5F9"
        : theme.colors.accent};
    box-shadow: 0 7px 18px rgba(0, 87, 217, 0.14);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  ${({ $variant }) =>
    $variant === "ghost" &&
    css`
      border-color: transparent;
    `}
`;

export default Button;
