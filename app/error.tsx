"use client";

import { useEffect } from "react";
import styled from "styled-components";
import Button from "@/components/ui/Button";

const Screen = styled.main`
  display: grid;
  min-height: 100dvh;
  place-content: center;
  justify-items: center;
  gap: 12px;
  padding: 24px;
  text-align: center;

  h2 {
    margin: 0;
    color: #0f172a;
    font-size: 20px;
  }

  p {
    max-width: 420px;
    margin: 0 0 8px;
    color: #64748b;
    font-size: 14px;
    line-height: 1.6;
  }
`;

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Lỗi trang MiniChat:", error);
  }, [error]);

  return (
    <Screen>
      <h2>Đã có lỗi xảy ra</h2>
      <p>{error.message || "Vui lòng thử tải lại trang."}</p>
      <Button type="button" onClick={reset}>
        Thử lại
      </Button>
    </Screen>
  );
}
