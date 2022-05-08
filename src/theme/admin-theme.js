import { createTheme } from "@mui/material/styles";
const palette = {
  success: {
    main: "#4CAF50"
  },
  error: {
    main: "#F44336"
  },
  warning: {
    main: "#ED6C02"
  },
  primary: {
    main: "#2196F3"
  },
  grey: {
    7: "#8C8C8C",
    100: "#F5F5F5"
  },
  text: {
    primary: "#000000DE"
  }
};

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
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          padding: "1px",
          fontSize: "24px"
        },
        fontSizeSmall: {
          fontSize: "20px"
        },
        fontSizeLarge: {
          fontSize: "28px"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          fontWeight: 700,
          textTransform: "none"
        },
        sizeSmall: {
          lineHeight: "22px"
        }
      }
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          ".MuiButtonGroup-grouped:not(:last-of-type)": {
            borderRight: "1px solid #fff"
          }
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
        root: ({ theme }) => ({
          "&.Mui-disabled": {
            backgroundColor: theme.palette.grey[100]
          }
        }),
        input: {
          paddingTop: 8,
          paddingBottom: 8
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        asterisk: {
          color: palette.error.main
        },
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
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: "bold",
          paddingLeft: 8,
          minWidth: 170,
          alignItems: "flex-start"
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
          color: "#FFFFFF",
          backgroundColor: "rgba(0, 0, 0, 0.87)"
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#F5F5F5"
        }
      }
    }
  },
  palette,
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
