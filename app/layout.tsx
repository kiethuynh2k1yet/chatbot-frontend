import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "MiniChat — Trò chuyện cùng bạn bè",
  description: "Nhắn tin trực tiếp, riêng tư và theo thời gian thực.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" data-scroll-behavior="smooth">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
