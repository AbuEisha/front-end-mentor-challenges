import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Josefin Sans",
  },
  colorSchemes: {
    dark: {
      palette: {
        background: {
          default: "hsl(235, 21%, 11%)",
          paper: "hsl(235, 24%, 19%)",
        },
        primary: { main: "hsl(220, 98%, 61%)" },
        secondary: { main: "hsl(237, 14%, 26%)" },
        text: {
          primary: "hsl(234, 39%, 85%)",
          secondary: "hsl(233, 14%, 35%)",
        },
        action: {
          hover: "hsl(0, 0%, 98%)",
          selected: "hsl(233, 14%, 35%)",
        },
      },
    },
    light: {
      palette: {
        background: {
          default: "hsl(0, 0%, 98%)",
          paper: "white",
        },
        primary: { main: "hsl(220, 98%, 61%)" },
        secondary: { main: "hsl(233, 11%, 84%)" },
        text: {
          primary: "hsl(235, 19%, 35%)",
          secondary: "hsl(236, 9%, 61%)",
        },
        action: {
          hover: "hsl(235, 19%, 35%)",
          selected: "hsl(233, 11%, 84%)",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme} defaultMode="dark">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
