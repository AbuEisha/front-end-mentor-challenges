import { Box, Grid, Typography } from "@mui/material";
import CustomButton from "./CustomButton";

import introIllustration from "../assets/images/illustration-intro.svg";

export default function IntroSection() {
  return (
    <Box
      component="section"
      paddingBlock={{ xs: "2.5rem 6.25rem", md: "6.75rem 7.75rem" }}
      position="relative"
      zIndex={2}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={{ xs: 3.75, md: 4, lg: 0 }}
      >
        <Grid
          size={{ xs: 12, md: 6, lg: 5 }}
          order={{ xs: 2, md: 1 }}
          textAlign={{ xs: "center", md: "start" }}
        >
          <Typography
            variant="h1"
            fontSize={{ xs: "2.25rem", md: "2.5rem", lg: "3.25rem" }}
            fontWeight={700}
            color="text.primary"
          >
            {"Bring everyone together to build better products."}
          </Typography>
          <Typography
            variant="body1"
            lineHeight={{ xs: 1.75, md: 1.5 }}
            color="text.secondary"
            maxWidth={{ xs: "100%", md: "350px" }}
            marginBlock={{ xs: "10px 2rem", md: "1.75rem 2.5rem" }}
          >
            {
              "Manage makes it simple for software teams to plan day-to-day tasks while keeping the larger team goals in view."
            }
          </Typography>
          <CustomButton color="primary.main" />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 6 }} order={{ xs: 1, md: 2 }}>
          <Box
            component="img"
            src={introIllustration}
            alt="Intro Illustration"
            display="block"
            maxWidth="100%"
            marginInline="auto"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
