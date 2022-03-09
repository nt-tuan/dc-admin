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
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            paddingTop: 0,
            paddingBottom: 0
          }
        }
      }
    }
  },
  palette: {
    success: {
      main: "#4CAF50"
    },
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
    h5: {
      fontWeight: 700
    }
  }
});
