import { Box, Container } from "@mui/material";
import "./App.css";
import Navbar from "./components/Navbar";

import designPattern from "./assets/images/bg-tablet-pattern.svg";
import IntroSection from "./components/IntroSection";
import AboutSection from "./components/AboutSection";
import TestimonialsSlider from "./components/TestimonialsSlider";
import SimplifySection from "./components/SimplifySection";
import FooterSection from "./components/FooterSection";

function App() {
  return (
    <Box
      component="main"
      sx={{
        overflow: "hidden",
        paddingBlockStart: { xs: "2.5rem", md: "3.5rem" },
        backgroundColor: "background.default",
      }}
    >
      <Container
        sx={{
          maxWidth: { lg: "1110px" },
          paddingInline: { xs: "1.5rem", lg: 0 },
          position: "relative",
          zIndex: 6,
        }}
      >
        <Box
          component="img"
          src={designPattern}
          alt="Design Pattern"
          sx={{
            position: "absolute",
            width: { xs: "430px", md: "auto" },
            right: { xs: "-122px", md: -315 },
            top: { xs: "-125px", md: "-15%" },
            zIndex: "-1",
          }}
        />
        <Navbar />
        <IntroSection />
        <AboutSection />
      </Container>
      <TestimonialsSlider />
      <SimplifySection />
      <FooterSection />
    </Box>
  );
}

export default App;
