import { createTheme } from "@mui/material/styles";

export const adminTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: "none"
        },
        html: {
          height: "100%"
        },
        body: {
          height: "100%"
        },
        "#root": {
          height: "100%"
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          paddingTop: 8,
          paddingBottom: 8
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          paddingTop: 8,
          paddingBottom: 8
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ ownerState }) =>
          !ownerState.shrink
            ? {
                transform: "translate(14px, 8px)"
              }
            : undefined
      }
    }
  },
  palette: {
    primary: {
      main: "#2196F3"
    },
    grey: {
      100: "#F5F5F5"
    }
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    h3: {
      color: "inherit",
      fontSize: 26,
      fontWeight: 700
    },
    h4: {
      fontSize: 18,
      lineHeight: 1,
      fontWeight: 700,
      color: "inherit"
    },
    h5: {
      fontSize: 16,
      fontWeight: 700,
      color: "inherit"
    },
    h6: {
      fontSize: 12,
      fontWeight: 700,
      color: "inherit"
    }
  }
});