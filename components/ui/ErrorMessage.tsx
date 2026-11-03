"use client";

import styled from "styled-components";

const ErrorBox = styled.div`
  padding: 11px 13px;
  border: 1px solid #fecaca;
  border-radius: 11px;
  color: #b91c1c;
  background: #fef2f2;
  font-size: 13px;
  line-height: 1.5;
`;

export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <ErrorBox role="alert">{children}</ErrorBox>;
}
