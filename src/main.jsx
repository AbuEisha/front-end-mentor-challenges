import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Be Vietnam Pro",
  },
  palette: {
    primary: {
      main: "hsl(12, 88%, 59%)",
    },
    secondary: {
      main: "hsl(228, 39%, 23%)",
    },
    text: {
      primary: "hsl(228, 39%, 23%)",
      secondary: "hsl(0deg 0% 70.5%)",
    },
    background: {
      default: "hsl(0, 0%, 98%)",
      paper: "hsl(13, 100%, 96%)",
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
