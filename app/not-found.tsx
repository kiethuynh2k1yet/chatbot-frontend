"use client";

import Link from "next/link";
import styled from "styled-components";

const Screen = styled.main`
  display: grid;
  min-height: 100dvh;
  place-content: center;
  justify-items: center;
  gap: 12px;
  text-align: center;

  h1 {
    margin: 0;
    color: #0f172a;
    font-size: 28px;
  }

  p {
    margin: 0;
    color: #64748b;
  }

  a {
    margin-top: 8px;
    color: #0068ff;
    font-weight: 650;
  }
`;

export default function NotFound() {
  return (
    <Screen>
      <h1>Không tìm thấy trang</h1>
      <p>Đường dẫn này không tồn tại hoặc bạn không có quyền truy cập.</p>
      <Link href="/chats">Quay về MiniChat</Link>
    </Screen>
  );
}
