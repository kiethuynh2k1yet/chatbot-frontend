"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import ThemeProvider from "@/components/styles/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { usePresence } from "@/hooks/usePresence";

function PresenceBridge() {
  usePresence();
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") {
    return (
      <ThemeProvider>
        <AuthProvider>
          <PresenceBridge />
          {children}
        </AuthProvider>
      </ThemeProvider>
    );
  }

  return (
    <StyleSheetManager sheet={sheet.instance}>
      <ThemeProvider>
        <AuthProvider>
          <PresenceBridge />
          {children}
        </AuthProvider>
      </ThemeProvider>
    </StyleSheetManager>
  );
}
