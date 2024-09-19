import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: '"Be Vietnam Pro", "Noto Sans", sans-serif',
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 900,
    },
    h3: {
      fontWeight: 900,
    },
    h4: {
      fontWeight: 900,
    },
    h5: {
      fontWeight: 900,
    },
    h6: {
      fontWeight: 900,
    },
  },
  palette: {
    primary: {
      main: "#4CAF50",
      contrastText: "#ffffff",
    },
    background: {
      default: "#feffe3",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#000000",
      secondary: "#757575",
    },
  },
  components: {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
          backgroundColor: "#f5f5f5",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          padding: "10px 20px",
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 4,
      },
      styleOverrides: {
        root: {
          borderRadius: "1rem",
          padding: "1rem",
        },
      },
    },
  },
});

export default theme;
