import { Box, Container, Grid, Typography } from "@mui/material";

import mobileSimplifyBg from "../assets/images/bg-simplify-section-mobile.svg";
import desktopSimplifyBg from "../assets/images/bg-simplify-section-desktop.svg";
import CustomButton from "./CustomButton";

export default function SimplifySection() {
  return (
    <Box
      component="section"
      sx={{ backgroundColor: "primary.main" }}
      position="relative"
    >
      <Box
        component="img"
        src={mobileSimplifyBg}
        alt="Mobile Simplify Background"
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: "0",
          display: { md: "none" },
        }}
      />
      <Container
        sx={{
          maxWidth: { lg: "1110px" },
          paddingInline: { xs: "1.5rem", lg: 0 },
        }}
      >
        <Box
          position="relative"
          paddingBlock={{ xs: "6.25rem 5.75rem", md: "4.75rem 4.25rem" }}
        >
          <Box
            component="img"
            src={desktopSimplifyBg}
            alt="Desktop Simplify Background"
            sx={{
              position: "absolute",
              top: "-55%",
              left: "90px",
              display: { xs: "none", md: "block" },
            }}
          />
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={{ xs: "1.5rem", md: 0 }}
          >
            <Grid
              size={{ xs: 12, md: 5 }}
              textAlign={{ xs: "center", md: "start" }}
            >
              <Typography
                variant="h2"
                fontSize="2.325rem"
                fontWeight={700}
                color="white"
              >
                {"Simplify how your team works today."}
              </Typography>
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              textAlign={{ xs: "center", md: "end" }}
            >
              <CustomButton color="white" />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
