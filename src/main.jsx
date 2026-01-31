import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "PlusJakartaSans",
  },
  palette: {
    background: {
      default: "hsl(202, 86%, 94%)",
      paper: "hsl(61, 70%, 52%)",
    },
    text: {
      primary: "hsl(202, 55%, 16%)",
      secondary: {
        main: "hsl(200, 24%, 40%)",
        light: "hsl(203, 41%, 72%)",
      },
    },
    action: {
      hover: "hsl(61deg 70% 52% / 50%)",
    },
    error: {
      main: "hsl(4, 69%, 50%)",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
