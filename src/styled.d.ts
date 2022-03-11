import { ThemeProvider, createGlobalStyle } from 'styled-components';

declare module 'styled-components' {
  {
    export interface DefaultTheme {
      cardColor: string;
      boxColor: string;
      listColor: string;
      textColor: string;
      accentColor: string;
      hoverColor: string;
    }
  }
}
