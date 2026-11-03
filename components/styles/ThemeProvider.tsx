"use client";

import { useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { GlobalStyle } from "./GlobalStyle";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark] = useState(false);
  return (
    <StyledThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
}
