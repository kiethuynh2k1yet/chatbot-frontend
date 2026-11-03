import type { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  mode: "light",
  colors: {
    primary: "#0068FF",
    accent: "#0057D9",
    background: "#F0F2F5",
    surface: "#FFFFFF",
    text: "#0F172A",
    muted: "#64748B",
    border: "#E8EDF3",
    success: "#22C55E",
    warning: "#F59E0B",
    error: "#DC2626",
    card: "#FFFFFF",
  },
};

export const darkTheme: DefaultTheme = {
  mode: "dark",
  colors: {
    primary: "#60A5FA",
    accent: "#3B82F6",
    background: "#0B1120",
    surface: "#111827",
    text: "#F8FAFC",
    muted: "#94A3B8",
    border: "#273449",
    success: "#4ADE80",
    warning: "#FBBF24",
    error: "#F87171",
    card: "#111827",
  },
};
