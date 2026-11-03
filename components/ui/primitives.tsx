"use client";

import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";
import styled, { keyframes } from "styled-components";

export const Button = styled.button<{
  $variant?: "primary" | "outline" | "ghost";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 46px;
  padding: 0 20px;
  border: 1px solid
    ${({ $variant, theme }) =>
      $variant === "outline" ? theme.colors.border : "transparent"};
  border-radius: 13px;
  color: ${({ $variant, theme }) =>
    $variant === "outline" || $variant === "ghost"
      ? theme.colors.text
      : "#fff"};
  background: ${({ $variant, theme }) =>
    $variant === "outline" || $variant === "ghost"
      ? "transparent"
      : theme.colors.primary};
  font-size: 14px;
  font-weight: 650;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 9px 22px rgba(37, 99, 235, 0.2);
    background: ${({ $variant, theme }) =>
      $variant === "outline" || $variant === "ghost"
        ? theme.colors.surface
        : theme.colors.accent};
  }
`;
export const Input = styled.input`
  width: 100%;
  min-height: 46px;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 11px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.card};
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }
`;
export const Textarea = styled.textarea`
  width: 100%;
  min-height: 110px;
  padding: 12px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 11px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.card};
  resize: vertical;
`;
export const Select = styled.select`
  min-height: 42px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.card};
`;
export const Card = styled.div`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.card};
  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.04);
`;
export const Badge = styled.span<{ $tone?: "success" | "warning" | "neutral" }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  color: ${({ $tone, theme }) =>
    $tone === "success"
      ? theme.colors.success
      : $tone === "warning"
        ? theme.colors.warning
        : theme.colors.muted};
  background: ${({ $tone }) =>
    $tone === "success"
      ? "rgba(22,163,74,.1)"
      : $tone === "warning"
        ? "rgba(245,158,11,.12)"
        : "rgba(100,116,139,.1)"};
  font-size: 12px;
  font-weight: 650;
`;

const fadeIn = keyframes`from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); }`;
export const Modal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.45);
  animation: ${fadeIn} 0.18s ease;
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  th,
  td {
    padding: 13px 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
  th {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }
`;
export const Tabs = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;
export const Toast = styled.div`
  padding: 13px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.card};
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
`;
export const Skeleton = styled.div<{
  $width?: string;
  $height?: string;
}>`width: ${({ $width }) => $width ?? "100%"}; height: ${({ $height }) => $height ?? "16px"}; border-radius: 8px; background: linear-gradient(90deg, ${({ theme }) => theme.colors.surface}, ${({ theme }) => theme.colors.border}, ${({ theme }) => theme.colors.surface}); background-size: 200% 100%; animation: shimmer 1.4s infinite; @keyframes shimmer { to { background-position: -200% 0; }`;
export const EmptyState = ({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) => (
  <Card style={{ textAlign: "center" }}>
    <div style={{ fontSize: 28, marginBottom: 10 }}>✳</div>
    <strong>{title}</strong>
    <p style={{ color: "#64748B" }}>{description}</p>
    {action}
  </Card>
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  $variant?: "primary" | "outline" | "ghost";
};
export type InputProps = InputHTMLAttributes<HTMLInputElement>;
export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;
