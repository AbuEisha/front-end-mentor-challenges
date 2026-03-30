import { Box, Container, IconButton, Typography } from "@mui/material";
import patternDesktop from "./assets/images/pattern-divider-desktop.svg";
import patternMobile from "./assets/images/pattern-divider-mobile.svg";
import DiceIcon from "./assets/images/icon-dice.svg?react";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [adviceDetails, setAdviceDetails] = useState({
    adviceNum: "",
    advice: "",
  });

  useEffect(() => {
    getAdvice(71);
  }, []);

  async function getAdvice(id = null) {
    try {
      const response = await fetch(
        `https://api.adviceslip.com/advice${typeof id == "number" ? "/" + id : ""}`,
      );
      if (!response.ok) {
        throw Error("Failed To Get Advice!");
      }
      const advice = await response.json();
      setAdviceDetails({
        adviceNum: advice.slip.id,
        advice: advice.slip.advice,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Box
      component="main"
      minHeight="100vh"
      sx={{
        backgroundColor: "hsl(218, 23%, 16%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container sx={{ maxWidth: { sm: "590px" } }}>
        <Box
          sx={{
            backgroundColor: "hsl(217, 19%, 24%)",
            padding: { xs: "2.5rem 1.5rem", sm: "3rem" },
            borderRadius: "1rem",
            boxShadow: "10px 10px 10px hsl(0deg 0% 0% / 5%)",
            textAlign: "center",
            position: "relative",
          }}
        >
          <Typography
            variant="caption"
            textTransform="uppercase"
            color="hsl(150, 100%, 66%)"
            fontSize="12px"
            fontWeight={800}
            letterSpacing="5px"
          >
            {`Advice #${adviceDetails.adviceNum}`}
          </Typography>
          <Typography
            variant="h1"
            fontSize={{ xs: "24px", sm: "28px" }}
            fontWeight={800}
            lineHeight={1.4}
            color="hsl(193, 38%, 86%)"
            marginBlock={{ xs: "1.5rem", sm: "1.5rem 2.5rem" }}
          >
            <q>{adviceDetails.advice}</q>
          </Typography>
          <Box
            component="img"
            src={patternMobile}
            alt="Pattern Mobile"
            display={{ xs: "blocl", sm: "none" }}
            marginInline="auto"
            marginBlockEnd="1.5rem"
          />
          <Box
            component="img"
            src={patternDesktop}
            alt="Pattern Desktop"
            display={{ xs: "none", sm: "block" }}
            marginInline="auto"
            marginBlockEnd="1.5rem"
          />
          <IconButton
            aria-label="Change Advice"
            disableRipple
            onClick={getAdvice}
            sx={{
              position: "absolute",
              width: "64px",
              height: "64px",
              left: "50%",
              bottom: "-32px",
              transform: "translateX(-50%)",
              backgroundColor: "hsl(150, 100%, 66%)",
              "&:hover": {
                backgroundColor: "hsl(150, 100%, 66%)",
                boxShadow: "2px -2px 28px hsl(150, 100%, 66%)",
              },
              "&.Mui-focusVisible": {
                backgroundColor: "hsl(150, 100%, 66%)",
                boxShadow: "2px -2px 28px hsl(150, 100%, 66%)",
              },
            }}
          >
            <DiceIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
