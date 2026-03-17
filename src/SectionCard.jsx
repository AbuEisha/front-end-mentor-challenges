import { Box, Stack, Typography, IconButton } from "@mui/material";
import workIcon from "./assets/images/icon-work.svg";
import playIcon from "./assets/images/icon-play.svg";
import studyIcon from "./assets/images/icon-study.svg";
import exerciseIcon from "./assets/images/icon-exercise.svg";
import socialIcon from "./assets/images/icon-social.svg";
import selfCareIcon from "./assets/images/icon-self-care.svg";
import EllipsisIcon from "./assets/images/icon-ellipsis.svg?react";

import data from "./assets/data.json";
export default function SectionCard({ title, index, alignment }) {
  return (
    <Box
      sx={{
        backgroundColor:
          title === "Work"
            ? "hsl(15, 100%, 70%)"
            : title === "Play"
              ? "hsl(195, 74%, 62%)"
              : title === "Study"
                ? "hsl(348, 100%, 68%)"
                : title === "Exercise"
                  ? "hsl(145, 58%, 55%)"
                  : title === "Social"
                    ? "hsl(264, 64%, 52%)"
                    : "hsl(43, 84%, 65%)",
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: { xs: "38px", md: "46px" },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{ position: "absolute", top: "-10px", right: "20px" }}
          component="img"
          src={
            title === "Work"
              ? workIcon
              : title === "Play"
                ? playIcon
                : title === "Study"
                  ? studyIcon
                  : title === "Exercise"
                    ? exerciseIcon
                    : title === "Social"
                      ? socialIcon
                      : selfCareIcon
          }
          alt="Work Icon"
        />
      </Box>
      <Box
        sx={{
          cursor: "pointer",
          overflow: "hidden",
          padding: { xs: "1.75rem 1.5rem", md: "2rem" },
          borderRadius: "1rem 1rem 0 0",
          backgroundColor: "hsl(235, 46%, 20%)",
          "&:hover": { backgroundColor: "hsl(236, 41%, 34%)" },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h2"
            fontSize="18px"
            fontWeight={400}
            color="white"
          >
            {title}
          </Typography>
          <IconButton
            sx={{
              padding: 0,
              "&:hover": { "& svg": { "& path": { fill: "white" } } },
            }}
          >
            <EllipsisIcon />
          </IconButton>
        </Stack>
        <Stack
          direction={{ xs: "row", md: "column" }}
          justifyContent={{ xs: "space-between", md: "normal" }}
          alignItems={{ xs: "center", md: "normal" }}
          marginBlockStart={{ xs: "8.6px", md: 3 }}
        >
          <Typography
            variant="h3"
            fontSize={{ xs: "1.95rem", md: "3.4rem" }}
            fontWeight={300}
            color="white"
          >
            {`${data[index]["timeframes"][alignment]["current"]}hrs`}
          </Typography>
          <Typography
            variant="body1"
            fontSize="15px"
            fontWeight={300}
            color="hsl(236, 100%, 87%)"
            marginBlockStart={{ xs: 0, md: ".25rem" }}
          >
            {`Last ${alignment === "daily" ? "Day" : alignment === "weekly" ? "Week" : "Month"} - ${data[index]["timeframes"][alignment]["previous"]}hrs`}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
