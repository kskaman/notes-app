import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customText: {
      primary: string;
      secondary: string;
      light: string;
    };
    sidebar: {
      background: string;
      text: string;
      selected: string;
      selectedText: string;
      hover: string;
      hoverText: string;
      extra: string;
    };
    primaryButton: {
      bg: string;
      warningBg: string;
      hoverBg: string;
      hoverWarningBg: string;
      disabledBg: string;
      text: string;
      hoverText: string;
      disabledText: string;
    };
    secondaryButton: {
      bg: string;
      hoverBg: string;
      disabledBg: string;
      text: string;
      hoverText: string;
      disabledText: string;
    };
  

    authPage: {
      bg: string;
      containerBg: string;
    };
    

    others: {
      [key: string]: string; // or define explicitly if you want typed keys
    };
  }

  interface PaletteOptions {
    customText?: {
      primary?: string;
      secondary?: string;
      light?: string;
    };
    sidebar?: {
      background?: string;
      text?: string;
      selected?: string;
      selectedText?: string;
      hover?: string;
      hoverText?: string;
      extra?: string;
    };
    primaryButton?: {
      bg?: string;
      warningBg?: string;
      hoverBg?: string;
      hoverWarningBg?: string;
      disabledBg?: string;
      text?: string;
      hoverText?: string;
      disabledText?: string;
    };
    secondaryButton?: {
      bg?: string;
      hoverBg?: string;
      disabledBg?: string;
      text?: string;
      hoverText?: string;
      disabledText?: string;
    };
    
    authPage?: {
      bg?: string;
      containerBg?: string;
    };
   
    others?: {
      [key: string]: string;
    };
  }
}