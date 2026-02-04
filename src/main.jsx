import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
  palette: {
    primary: {
      main: "hsl(259, 100%, 65%)",
      light: "hsl(0, 1%, 44%)",
      dark: "hsl(0, 0%, 0%)",
    },
    background: {
      default: "hsl(0, 0%, 94%)",
    },
    error: {
      main: "hsl(0, 100%, 67%)",
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
