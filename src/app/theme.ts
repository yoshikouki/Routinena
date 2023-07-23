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
          contrastText: "#FEFCF7",
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
          contrastText: "#FEFCF7",
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
