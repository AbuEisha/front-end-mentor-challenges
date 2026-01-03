import { Box, Grid, Stack, Typography } from "@mui/material";

import ticketPattern from "../assets/images/pattern-ticket.svg";
import bigLogo from "../assets/images/logo-mark.svg";
import GithubIcon from "../assets/images/icon-github.svg?react";

export default function TicketDesign({ info }) {
  return (
    <>
      <Typography
        variant="h1"
        fontSize={{ xs: "1.75rem", sm: "2.5rem", md: "3.5rem" }}
        fontWeight={700}
      >
        {"Congrats, "}
        <Box
          component="span"
          sx={{
            background:
              "linear-gradient(45deg, hsl(7, 86%, 67%), hsl(0, 0%, 100%))",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {info.fullName}
        </Box>
        {"! Your ticket is ready."}
      </Typography>
      <Typography
        variant="body1"
        color="hsl(252, 6%, 83%)"
        fontSize={{ xs: "1.15rem", md: "1.35rem" }}
        fontWeight={500}
        marginBlockStart=".75rem"
        maxWidth="29.25rem"
        marginInline="auto"
      >
        {"We've emailed your ticket to "}
        <Box component="span" sx={{ color: "hsl(7, 88%, 67%)" }}>
          {info.email}
        </Box>
        {" and will send updates in the run up to the event."}
      </Typography>

      <Box
        sx={{
          position: "relative",
          maxWidth: "37.5rem",
          maxHeight: "17.5rem",
          marginInline: "auto",
          marginBlockStart: "5rem",
          textAlign: "start",
        }}
      >
        <Box
          component="img"
          src={ticketPattern}
          maxWidth="100%"
          alt="Ticket Pattern"
        />
        <Grid
          container
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            padding: { xs: "1rem", sm: "1.5rem" },
          }}
        >
          <Grid size={{ xs: 11, sm: 10.5 }}>
            <Stack justifyContent="space-between" height="100%">
              <Stack
                direction="row"
                alignItems="flex-start"
                gap={{ xs: ".75rem", sm: "1.25rem" }}
              >
                <Box
                  component="img"
                  src={bigLogo}
                  alt="Logo Mark"
                  marginBlockStart={{ xs: ".35rem", sm: ".5rem" }}
                  width={{ xs: "1.875rem", sm: "auto" }}
                />
                <Box>
                  <Typography
                    variant="h2"
                    fontSize={{ xs: "1.5rem", sm: "2.35rem" }}
                    fontWeight={700}
                    marginBlockEnd={{ xs: ".25rem", sm: "0.875rem" }}
                  >
                    Coding Conf
                  </Typography>
                  <Typography
                    component="span"
                    fontSize={{ xs: ".9rem", sm: "1.181rem" }}
                    sx={{ color: "hsl(252, 6%, 83%)" }}
                  >
                    {"Jan 31, 2025 / Austin, TX"}
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                gap={{ xs: ".75rem", sm: "1.25rem" }}
              >
                <Box
                  width={{ xs: "2.875rem", sm: "5rem" }}
                  height={{ xs: "2.875rem", sm: "5rem" }}
                  borderRadius={{ xs: ".5rem", sm: ".75rem" }}
                  overflow="hidden"
                >
                  <Box
                    component="img"
                    src={URL.createObjectURL(info.imageFile)}
                    alt={info.fullName + " Avatar"}
                    maxWidth="100%"
                  />
                </Box>
                <Box>
                  <Typography
                    variant="h3"
                    fontSize={{ xs: "1.2rem", sm: "1.745rem" }}
                    fontWeight={500}
                    lineHeight="1"
                    marginBlockEnd={{ xs: "0.3125rem", sm: ".4rem" }}
                  >
                    {info.fullName}
                  </Typography>
                  <Box
                    component="div"
                    display="flex"
                    alignItems="center"
                    gap={{ xs: ".25rem", sm: ".55rem" }}
                    sx={{
                      color: "hsl(252, 6%, 83%)",
                      "& svg": { width: { xs: "1.125rem", sm: "auto" } },
                    }}
                  >
                    <GithubIcon />
                    <Typography
                      variant="body2"
                      fontSize={{ xs: ".92rem", sm: "1.18rem" }}
                    >
                      {info.userName}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            size={{ xs: 1, sm: 1.5 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              component="span"
              fontSize={{ xs: "1.5rem", sm: "1.75rem" }}
              sx={{ transform: "rotateZ(90deg)", color: "hsl(245, 15%, 58%)" }}
            >
              {"#01609"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
