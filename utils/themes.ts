import { ThemeDefinition } from "vuetify";

// String that represents the name of the theme I am using
export const LIGHT_THEME = "dark";
// Light mode theme
export const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#F1F1F1",
    surface: "#FFFFFF",
    primary: "#f41b34",
    secondary: twColors.purple[600],
    error: twColors.red[500],
    info: twColors.blue[500],
    success: twColors.emerald[500],
    warning: twColors.amber[500],
  },
};

// String that represents the name of the dark theme I am using
export const DARK_THEME = "dark";
// Dark mode theme
export const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#151515",
    surface: "#262626",
    primary: "#F3954A",
    secondary: twColors.purple[500],
    error: twColors.red[500],
    info: twColors.blue[500],
    success: twColors.emerald[500],
    warning: twColors.amber[500],
  },
};
