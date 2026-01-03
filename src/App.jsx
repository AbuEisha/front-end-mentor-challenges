import { Box, Container } from "@mui/material";
import "./App.css";
import mobileBg from "./assets/images/background-mobile.png";
import tabletBg from "./assets/images/background-tablet.png";
import desktopBg from "./assets/images/background-desktop.png";
import patternLines from "./assets/images/pattern-lines.svg";
import PatternCircle from "./assets/images/pattern-circle.svg?react";
import patternLinesDBottom from "./assets/images/pattern-squiggly-line-bottom-desktop.svg";
import patternLinesMBottom from "./assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg";
import PatternLinesTop from "./assets/images/pattern-squiggly-line-top.svg?react";
import Logo from "./assets/images/logo-full.svg";
import FormDesign from "./components/FormDesign";
import { useState } from "react";
import TicketDesign from "./components/TicketDesign";
export default function App() {
  const [formInputs, setFormInputs] = useState({
    imageFile: null,
    fullName: "",
    email: "",
    userName: "",
  });

  const [showTicket, setShowTicket] = useState(false);

  const handleInputsChange = (e, valueName) => {
    if (valueName === "imageFile")
      setFormInputs((prev) => ({ ...prev, [valueName]: e.target.files[0] }));
    else setFormInputs((prev) => ({ ...prev, [valueName]: e.target.value }));
  };

  const handleDropFile = (file) => {
    setFormInputs((prev) => ({ ...prev, imageFile: file }));
  };

  const handleDeleteFile = () => {
    setFormInputs((prev) => ({ ...prev, imageFile: null }));
  };

  const handleSubmit = () => {
    setShowTicket(true);
  };
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        paddingBlock: { xs: "2rem 2.34rem", md: "2.5rem 3.8rem" },
        position: "relative",
        backgroundImage: {
          xs: `url(${mobileBg})`,
          sm: `url(${tabletBg})`,
          md: `url(${desktopBg})`,
        },
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: 1,
        color: "hsl(0, 0%, 100%)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
          top: "0",
          left: "0",
          backgroundImage: `url(${patternLines})`,
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: { xs: "-3.125rem", md: "-9%" },
            left: { xs: "-1.75rem", md: "2.875rem" },
            "& svg": {
              width: { xs: "9.375rem", md: "auto" },
              height: { xs: "9.375rem", md: "auto" },
            },
          }}
        >
          <PatternCircle />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: { xs: "0.5rem", md: "7%" },
            right: "0rem",
            "& svg": {
              width: { xs: "10rem", md: "auto" },
              height: { xs: "6.25rem", md: "auto" },
            },
          }}
        >
          <PatternLinesTop />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: { xs: "59.5%", md: "53%" },
            right: { xs: "-4.125rem", md: "20.25%" },
            "& svg": {
              width: { xs: "8.375rem", md: "auto" },
              height: { xs: "8.375rem", md: "auto" },
            },
          }}
        >
          <PatternCircle />
        </Box>
        <Box
          sx={{
            backgroundImage: {
              xs: `url("${patternLinesMBottom}")`,
              md: `url("${patternLinesDBottom}")`,
            },
            position: "absolute",
            width: { xs: "47.5rem", md: "51.5625rem" },
            height: { xs: "33.125rem", md: "25rem" },
            bottom: { xs: "-8.125rem", md: "0" },
            left: { xs: "-1.5rem", md: "0" },
          }}
        ></Box>
      </Box>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Box
          component="img"
          src={Logo}
          marginBlockEnd={{ xs: "2.75rem", md: "4.25rem" }}
          alt="Conference Ticket Generator Logo"
        />
        {showTicket ? (
          <TicketDesign info={formInputs} />
        ) : (
          <FormDesign
            values={formInputs}
            handleChange={handleInputsChange}
            handleDrop={handleDropFile}
            handleDelete={handleDeleteFile}
            handleFormSubmit={handleSubmit}
          />
        )}
      </Container>
    </Box>
  );
}
