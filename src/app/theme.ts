import { grey } from "@mui/material/colors";
import { type CssVarsThemeOptions } from "@mui/material/styles";
import { M_PLUS_Rounded_1c } from "next/font/google";

export const font = M_PLUS_Rounded_1c({
  weight: ["100", "400", "900"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export const cssVarsThemeOptions: CssVarsThemeOptions = {
  colorSchemes: {
    light: {
      palette: {
        background: {
          defaultChannel: "#FEFCF7",
        },
        primary: {
          main: "#F29D52",
          dark: "#A6705D",
        },
        secondary: {
          main: "#509AB2",
        },
        text: {
          primary: "#40221B",
          secondary: grey[800], // #424242
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: "#40221B",
        },
        primary: {
          main: "#F29D52",
        },
        secondary: {
          main: "#509AB2",
        },
        text: {
          primary: "#FFFCF5",
          secondary: grey[500], // #9e9e9e
        },
      },
    },
  },

  typography: {
    allVariants: {
      fontFamily: font.style.fontFamily,
    },
    button: {
      textTransform: "none",
    },
  },
};
