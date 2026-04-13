import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme({
  typography: {
    fontFamily: "DM Sans",
    h1: {
      fontFamily: "Bricolage Grotesque",
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
