import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "League Spartan",
  },
  palette: {
    primary: {
      light: "hsl(180, 8%, 52%)",
      main: "hsl(180, 29%, 50%)",
      dark: "hsl(180, 14%, 20%)",
    },
    background: {
      default: "hsl(180, 52%, 96%)",
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
