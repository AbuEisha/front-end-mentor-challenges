import { Box, Grid, Stack, Typography } from "@mui/material";

import designPattern from "../assets/images/bg-tablet-pattern.svg";

const services = [
  {
    id: "01",
    title: "Track company-wide progress",
    description:
      "See how your day-to-day tasks fit into the wider vision. Go from tracking progress at the milestone level all the way done to the smallest of details. Never lose sight of the bigger picture again.",
  },
  {
    id: "02",
    title: "Advanced built-in reports",
    description:
      "Set internal delivery estimates and track progress toward company goals. Our customisable dashboard helps you build out the reports you need to keep key stakeholders informed.",
  },
  {
    id: "03",
    title: "Everything you need in one place",
    description:
      "Stop jumping from one service to another to communicate, store files, track tasks and share documents. Manage offers an all-in-one team productivity solution.",
  },
];

export default function AboutSection() {
  return (
    <Box
      component="section"
      paddingBlockEnd={{ xs: "4.5rem", md: "9.75rem" }}
      position="relative"
      zIndex={1}
    >
      <Box
        component="img"
        src={designPattern}
        alt="Design Pattern"
        sx={{
          display: { md: "none" },
          position: "absolute",
          width: "300px",
          right: "-186px",
          top: "-310px",
          zIndex: -1,
        }}
      />
      <Grid
        container
        justifyContent="space-between"
        spacing={{ xs: "54px", md: 4, lg: 0 }}
      >
        <Grid
          size={{ xs: 12, md: 6, lg: 5 }}
          textAlign={{ xs: "center", md: "start" }}
        >
          <Typography
            variant="h2"
            fontSize={{ xs: "2rem", md: "2.5rem", lg: "2.25rem" }}
            fontWeight={700}
            color="text.primary"
          >
            {"What’s different about Manage?"}
          </Typography>
          <Typography
            variant="body1"
            fontSize={{ xs: "15px", md: "1rem" }}
            lineHeight={{ xs: 1.85, md: 1.5 }}
            color="text.secondary"
            maxWidth={{ xs: "100%", md: "350px" }}
            marginBlockStart={{ xs: "18px", md: "30px" }}
          >
            {
              "Manage provides all the functionality your team needs, without the complexity. Our software is tailor-made for modern digital product teams. "
            }
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack
            gap={{ xs: 6, md: 5.25 }}
            marginInline={{ xs: "-8px -24px", md: 0 }}
          >
            {services.map((service) => (
              <Box key={service.id}>
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  gap={{ xs: 2, md: "28px" }}
                  marginBlockEnd={{ xs: "14px", md: 0 }}
                  sx={{
                    backgroundColor: {
                      xs: "background.paper",
                      md: "transparent",
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    minWidth="68px"
                    height="38px"
                    borderRadius="24px"
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      fontWeight: 500,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {service.id}
                  </Typography>
                  <Typography
                    variant="h3"
                    fontSize="1rem"
                    lineHeight={1}
                    fontWeight={700}
                    color="text.primary"
                  >
                    {service.title}
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  fontSize={{ xs: "14.5px", md: "1rem" }}
                  lineHeight={{ xs: 1.85, md: 1.5 }}
                  color="text.secondary"
                  paddingInlineStart={{ md: "96px" }}
                  paddingInlineEnd={{ lg: "6px" }}
                  marginBlockStart={{ md: "12px" }}
                >
                  {service.description}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
