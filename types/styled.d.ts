import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mode: "light" | "dark";
    colors: {
      primary: string;
      accent: string;
      background: string;
      surface: string;
      text: string;
      muted: string;
      border: string;
      success: string;
      warning: string;
      error: string;
      card: string;
    };
  }
}
