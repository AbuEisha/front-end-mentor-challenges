import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
} from "@mui/material";
import jeremyImage from "./assets/images/image-jeremy.png";
import "./App.css";
import SectionCard from "./SectionCard";

const sections = ["Work", "Play", "Study", "Exercise", "Social", "Self Care"];

function App() {
  const [alignment, setAlignment] = useState("weekly");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <Box
      component="main"
      minHeight="100vh"
      sx={{ backgroundColor: "hsl(226, 43%, 10%)" }}
      display="flex"
      alignItems="center"
      paddingBlock={{ xs: "5rem", md: 0 }}
    >
      <Container
        sx={{ maxWidth: { lg: "1112px" }, paddingInline: { xs: "1.5rem" } }}
      >
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Stack
              component="section"
              sx={{
                backgroundColor: "hsl(235, 46%, 20%)",
                borderRadius: "1rem",
                overflow: "hidden",
                height: "100%",
              }}
            >
              <Stack
                direction={{ xs: "row", md: "column" }}
                alignItems={{ xs: "center", md: "flex-start" }}
                gap={{ xs: "18px", md: "2.5rem" }}
                sx={{
                  backgroundColor: "hsl(246, 80%, 60%)",
                  padding: { xs: "2rem", md: "2rem 1.75rem" },
                  borderRadius: "0 0 1rem 1rem",
                  flex: 1,
                }}
              >
                <Box
                  width={{ xs: "70px", md: "85px" }}
                  padding="3px"
                  sx={{ backgroundColor: "white", borderRadius: "50%" }}
                >
                  <Box
                    component="img"
                    src={jeremyImage}
                    alt="Jeremy Image"
                    display="block"
                    maxWidth="100%"
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    fontWeight={300}
                    color="hsl(236, 100%, 87%)"
                  >
                    Report for
                  </Typography>
                  <Typography
                    variant="h1"
                    fontSize={{ xs: "1.5rem", md: "2.5rem" }}
                    color="white"
                  >
                    Jeremy Robson
                  </Typography>
                </Box>
              </Stack>
              <Box padding={{ xs: ".5rem 2.25rem", md: "1.75rem 2rem" }}>
                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  sx={{
                    flexDirection: { xs: "row", md: "column" },
                    alignItems: { xs: "baseline", md: "normal" },
                    justifyContent: { xs: "space-between", md: "normal" },
                    width: "100%",
                  }}
                  exclusive
                  onChange={handleChange}
                  aria-label="Times Frames"
                >
                  <ToggleButton
                    value="daily"
                    sx={{
                      fontSize: "18px",
                      fontWeight: 300,
                      color: "hsl(235, 45%, 61%)",
                      padding: "0",
                      justifyContent: "flex-start",
                      textTransform: "none",
                      border: "none",
                      borderRadius: "0",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "white",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "transparent",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      },
                    }}
                  >
                    Daily
                  </ToggleButton>
                  <ToggleButton
                    value="weekly"
                    sx={{
                      "&&": {
                        marginBlock: ".75rem .5rem",
                      },
                      fontSize: "18px",
                      fontWeight: 300,
                      color: "hsl(235, 45%, 61%)",
                      padding: "0",
                      justifyContent: "flex-start",
                      textTransform: "none",
                      border: "none",
                      borderRadius: "0",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "white",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "transparent",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      },
                    }}
                  >
                    Weekly
                  </ToggleButton>
                  <ToggleButton
                    value="monthly"
                    sx={{
                      fontSize: "18px",
                      fontWeight: 300,
                      color: "hsl(235, 45%, 61%)",
                      padding: "0",
                      justifyContent: "flex-start",
                      textTransform: "none",
                      border: "none",
                      borderRadius: "0",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "white",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "transparent",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      },
                    }}
                  >
                    Monthly
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {sections.map((section, index) => (
                <Grid key={section} size={{ xs: 12, md: 4 }}>
                  <SectionCard
                    title={section}
                    index={index}
                    alignment={alignment}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
