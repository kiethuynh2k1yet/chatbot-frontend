"use client";

import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  min-height: 48px;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  outline: none;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.card};
  font-size: 14px;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 104, 255, 0.11);
  }
`;

export default Input;
