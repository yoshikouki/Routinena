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
          defaultChannel: grey[100], // #f5f5f5
        },
        primary: {
          main: "#F29D52",
          contrastText: grey[50], // #fafafa
        },
        secondary: {
          main: "#509AB2",
          contrastText: grey[50], // #fafafa
        },
        text: {
          primary: grey[800], // #424242
          secondary: grey[700], // #616161
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: "#000000",
        },
        primary: {
          main: "#F29D52",
          contrastText: grey[50], // #fafafa
        },
        secondary: {
          main: "#509AB2",
          contrastText: grey[50], // #fafafa
        },
        text: {
          primary: grey[50], // #fafafa
          secondary: grey[300], // #e0e0e0
        },
      },
    },
  },

  typography: {
    allVariants: {
      fontFamily: font.style.fontFamily,
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    h1: {
      fontSize: "2rem",
      fontWeight: 900,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 900,
    },
    button: {
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(3),
          fontWeight: 900,
        }),
      },
    },

    MuiButtonBase: {
      styleOverrides: {
        root: ({ _theme }) => ({
          textDecoration: "none",
          "&:hover": {
            textDecoration: "none",
          },
        }),
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        a: {
          color: "inherit",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
  },
};
