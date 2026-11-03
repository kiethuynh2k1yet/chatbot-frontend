"use client";

import type { ReactNode } from "react";
import styled from "styled-components";

export const AuthCardFrame = styled.main`
  display: grid;
  min-height: 100dvh;
  place-items: center;
  padding: 24px 18px;
  background:
    radial-gradient(ellipse at 12% 12%, rgba(0, 104, 255, 0.1), transparent 34%),
    #f0f2f5;
`;

const Card = styled.section`
  width: min(100%, 440px);
  padding: 34px 26px 26px;
  border: 1px solid rgba(226, 232, 240, 0.85);
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 22px 65px rgba(15, 23, 42, 0.09);

  @media (min-width: 640px) {
    padding: 42px 42px 34px;
  }
`;

export const AuthBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 34px;
  color: #0f172a;
  font-size: 19px;
  font-weight: 750;
  letter-spacing: -0.04em;
`;

export const BrandMark = styled.span`
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 13px;
  color: #fff;
  background: #0068ff;
`;

export const AuthTitle = styled.h1`
  margin: 0;
  color: #0f172a;
  font-size: 25px;
  font-weight: 700;
  letter-spacing: -0.04em;
`;

export const AuthSubtitle = styled.p`
  margin: 9px 0 28px;
  color: #64748b;
  font-size: 14px;
  line-height: 1.65;
`;

export const AuthFooter = styled.p`
  margin: 24px 0 0;
  color: #64748b;
  font-size: 13px;
  text-align: center;

  a {
    color: #0068ff;
    font-weight: 650;
  }
`;

export default function AuthCard({ children }: { children: ReactNode }) {
  return (
    <AuthCardFrame>
      <Card>{children}</Card>
    </AuthCardFrame>
  );
}
