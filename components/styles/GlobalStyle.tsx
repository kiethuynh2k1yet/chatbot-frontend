"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; background: ${({ theme }) => theme.colors.background}; color: ${({ theme }) => theme.colors.text}; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-size: 15px; -webkit-font-smoothing: antialiased; }
  button, input, textarea, select { font: inherit; }
  button, a { -webkit-tap-highlight-color: transparent; }
  a { color: inherit; text-decoration: none; }
  button { color: inherit; }
  img, svg { display: block; max-width: 100%; }
  ::selection { background: rgba(37, 99, 235, .18); }
  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-track { background: ${({ theme }) => theme.colors.surface}; }
  ::-webkit-scrollbar-thumb { background: ${({ theme }) => theme.colors.border}; border: 2px solid ${({ theme }) => theme.colors.surface}; border-radius: 999px; }
  :focus-visible { outline: 3px solid rgba(37, 99, 235, .35); outline-offset: 3px; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }
`;
