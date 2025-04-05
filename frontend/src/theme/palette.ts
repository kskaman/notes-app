import { PaletteOptions } from "@mui/material/styles";


export const lightPalette: PaletteOptions = {
  
  // PRIMARY: backgrounds
  primary: {
    main: "#ffffff",          // Base for all content surfaces (cards, pages)
    contrastText: "#f5f5f5",  // Slight off-white for section dividers or nested containers
    dark: "#e0e0e0",          // Borders or light outlines
    light: "#fafafa",         // Very soft backgrounds
  },

  // SECONDARY: Brand Accent (Navy + Gold)
  secondary: {
    main: "#1C2B39",          // Accent buttons and focus rings
    contrastText: "#ffffff",  // Text on navy buttons
    light: "#495561",          // Hover or pressed states
    dark: "#D4AF37",         // Gold accents, borders, subtle highlight
  },

  // Buttons
  primaryButton: {
    bg: "#335cff",
    warningBg: "#fb3748",
    hoverBg: "#2547d0",
    hoverWarningBg: "#ffd5d8",
    disabledBg: "#f5f7fa",
    text: "#ffffff",
    hoverText: "#ffffff",
    disabledText: "#cacfd8",
  },
  secondaryButton: {
    bg: "#f3f5f8",
    hoverBg: "#ffffff",
    disabledBg: "#f5f7fa",
    text: "#0e121b",
    hoverText: "525866",
    disabledText: "#cacfd8",
  },

  error: {
    main: "#d32f2f",
    light: "#fcebea",
    dark: "#9a0007",
    contrastText: "#ffffff",
  },

  text: {
    primary: "#171717",       // Main text (blackish for contrast)
    secondary: "#4a4a4a",     // Body text, secondary labels
    disabled: "#999999",      // Muted/disabled elements
  },

  sidebar: {
    background: "#1C2B39",     // Sidebar BG (deep navy)
    text: "#ffffff",           // Sidebar label text
    selected: "#D4AF37",       // Active nav background or border
    selectedText: "#1C2B39",
    hover: "#2A3A4B",
    hoverText: "#ffffff",
    extra: "#c1c1c1",
  },

  authPage: {
    bg: "#f3f5f8",
    containerBg: "#ffffff",
  },


  others: {
    highlight: "#FFD700",
    infoPanel: "#f1f8ff",
  },
};





export const darkPalette: PaletteOptions = {
  
  // PRIMARY: backgrounds
  primary: {
    main: "#ffffff",          // Base for all content surfaces (cards, pages)
    contrastText: "#f5f5f5",  // Slight off-white for section dividers or nested containers
    dark: "#e0e0e0",          // Borders or light outlines
    light: "#fafafa",         // Very soft backgrounds
  },

  // SECONDARY: Buttons etc
  secondary: {
    main: "#335cff",          // Background
    contrastText: "#ffffff",  // Text on navy buttons
    light: "#495561",          // Hover or pressed states
    dark: "#D4AF37",         // Gold accents, borders, subtle highlight
  },

  error: {
    main: "#d32f2f",
    light: "#fcebea",
    dark: "#9a0007",
    contrastText: "#ffffff",
  },

  customText: {
    primary: "#0e121b",       // Main text - headings
    secondary: "#4a4a4a",     // Body text, secondary labels
    light: "525866",
  },

  sidebar: {
    background: "#1C2B39",     // Sidebar BG (deep navy)
    text: "#ffffff",           // Sidebar label text
    selected: "#D4AF37",       // Active nav background or border
    selectedText: "#1C2B39",
    hover: "#2A3A4B",
    hoverText: "#ffffff",
    extra: "#c1c1c1",
  },

  authPage: {
    bg: "#f3f5f8",
    containerBg: "#ffffff",
  },


  others: {
    highlight: "#FFD700",
    infoPanel: "#f1f8ff",
  },
};