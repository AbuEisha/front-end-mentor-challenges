import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Inter",
  },
  palette: {
    primary: {
      main: "hsl(5, 85%, 63%)",
      light: "hsl(35, 77%, 62%)",
      dark: "hsl(240, 100%, 5%)",
      contrastText: "hsl(36, 100%, 99%)",
    },
    text: {
      primary: "hsl(236, 13%, 42%)",
      secondary: "hsl(233, 8%, 79%)",
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
