import "./App.css";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";

import ArrowIcon from "./assets/images/icon-arrow.svg?react";
import { useState } from "react";

export default function App() {
  const [birthDate, setBirthDate] = useState({ day: "", month: "", year: "" });
  const [birthDateErrors, setBirthDateErrors] = useState({
    dayError: "",
    monthError: "",
    yearError: "",
  });
  const [age, setAge] = useState({ ageDays: "", ageMonths: "", ageYears: "" });

  const handleChange = (e, valueName) => {
    setBirthDate({ ...birthDate, [valueName]: e.target.value });

    if (birthDateErrors[`${valueName}Error`]) {
      setBirthDateErrors({ ...birthDateErrors, [`${valueName}Error`]: "" });
    }
  };

  const handleCalculateAge = (e) => {
    e.preventDefault();

    const today = new Date();
    let nowDay = today.getDate();
    let nowMonth = today.getMonth() + 1;
    let nowYear = today.getFullYear();

    const { day, month, year } = birthDate;
    const daysOfBirthMonth = new Date(year, month, 0).getDate();

    const errors = {
      dayError: !day
        ? "This field is required"
        : day.length > 2 ||
            day.includes(".") ||
            +day < 1 ||
            +day > daysOfBirthMonth
          ? "Must be a valid day"
          : "",
      monthError: !month
        ? "This field is required"
        : month.length > 2 || month.includes(".") || +month < 1 || +month > 12
          ? "Must be a valid month"
          : "",
      yearError: !year
        ? "This field is required"
        : year.length !== 4 || year.includes(".") || +year > nowYear
          ? "Must be in the past"
          : "",
    };

    const hasErrors = Object.values(errors).some((e) => e);

    setBirthDateErrors(errors);

    if (hasErrors) return false;

    let ageDays, ageMonths, ageYears;

    if (nowDay < day) {
      ageDays = nowDay + 31 - day;
      nowMonth--;
    } else {
      ageDays = nowDay - day;
    }
    if (nowMonth < month) {
      ageMonths = nowMonth + 12 - month;
      nowYear--;
    } else {
      ageMonths = nowMonth - month;
    }

    ageYears = nowYear - year;

    setAge({ ageDays, ageMonths, ageYears });
  };
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container sx={{ maxWidth: { md: "896px" } }}>
        <Box
          component="section"
          sx={{
            backgroundColor: "hsl(0, 100%, 100%)",
            padding: { xs: "3.5rem 1.5rem", md: "3.5rem" },
            borderRadius: { xs: "20px 20px 140px", md: "20px 20px 160px" },
          }}
        >
          <Box component="form">
            <Grid container spacing={{ xs: 2, md: 4 }}>
              <Grid size={{ xs: 4, md: 3 }}>
                <Typography
                  variant="button"
                  component="label"
                  htmlFor="birth-day"
                  fontSize={{ xs: ".75rem", md: "1rem" }}
                  fontWeight={700}
                  lineHeight={1}
                  display="block"
                  marginBlockEnd=".75rem"
                  letterSpacing=".25rem"
                  color={
                    birthDateErrors.dayError ? "error.main" : "primary.light"
                  }
                >
                  Day
                </Typography>
                <TextField
                  type="number"
                  id="birth-day"
                  variant="outlined"
                  placeholder="DD"
                  value={birthDate.day}
                  onChange={(e) => handleChange(e, "day")}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: { xs: "1.25rem", md: "1.75rem" },
                      fontWeight: 700,
                      color: "primary.dark",
                      caretColor: "hsl(259, 100%, 65%)",
                      "& input": {
                        padding: { xs: ".83rem 1rem", md: "1.03rem 1.5rem" },
                        appearance: "textfield",
                        "&::-webkit-inner-spin-button": {
                          appearance: "none",
                        },
                        "&::-webkit-outer-spin-button": {
                          appearance: "none",
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: birthDateErrors.dayError
                          ? "error.main"
                          : "hsl(0, 0%, 86%)",
                      },
                      "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "1px",
                        },
                      },
                    },
                  }}
                />
                {birthDateErrors.dayError && (
                  <Typography
                    variant="body2"
                    lineHeight={1}
                    fontStyle="italic"
                    color="error.main"
                    marginBlockStart=".75rem"
                  >
                    {birthDateErrors.dayError}
                  </Typography>
                )}
              </Grid>
              <Grid size={{ xs: 4, md: 3 }}>
                <Typography
                  variant="button"
                  component="label"
                  htmlFor="birth-month"
                  fontSize={{ xs: ".75rem", md: "1rem" }}
                  fontWeight={700}
                  lineHeight={1}
                  display="block"
                  marginBlockEnd=".75rem"
                  letterSpacing=".25rem"
                  color={
                    birthDateErrors.monthError ? "error.main" : "primary.light"
                  }
                >
                  Month
                </Typography>
                <TextField
                  type="number"
                  id="birth-month"
                  variant="outlined"
                  placeholder="MM"
                  value={birthDate.month}
                  onChange={(e) => handleChange(e, "month")}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: { xs: "1.25rem", md: "1.75rem" },
                      fontWeight: 700,
                      color: "primary.dark",
                      caretColor: "hsl(259, 100%, 65%)",
                      "& input": {
                        padding: { xs: ".83rem 1rem", md: "1.03rem 1.5rem" },
                        appearance: "textfield",
                        "&::-webkit-inner-spin-button": {
                          appearance: "none",
                        },
                        "&::-webkit-outer-spin-button": {
                          appearance: "none",
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: birthDateErrors.monthError
                          ? "error.main"
                          : "hsl(0, 0%, 86%)",
                      },
                      "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "1px",
                        },
                      },
                    },
                  }}
                />
                {birthDateErrors.monthError && (
                  <Typography
                    variant="body2"
                    lineHeight={1}
                    fontStyle="italic"
                    color="error.main"
                    marginBlockStart=".75rem"
                  >
                    {birthDateErrors.monthError}
                  </Typography>
                )}
              </Grid>
              <Grid size={{ xs: 4, md: 3 }}>
                <Typography
                  variant="button"
                  component="label"
                  htmlFor="birth-year"
                  fontSize={{ xs: ".75rem", md: "1rem" }}
                  fontWeight={700}
                  lineHeight={1}
                  display="block"
                  marginBlockEnd=".75rem"
                  letterSpacing=".25rem"
                  color={
                    birthDateErrors.yearError ? "error.main" : "primary.light"
                  }
                >
                  Year
                </Typography>
                <TextField
                  type="number"
                  id="birth-year"
                  variant="outlined"
                  placeholder="YYYY"
                  value={birthDate.year}
                  onChange={(e) => handleChange(e, "year")}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: { xs: "1.25rem", md: "1.75rem" },
                      fontWeight: 700,
                      color: "primary.dark",
                      caretColor: "hsl(259, 100%, 65%)",
                      "& input": {
                        padding: { xs: ".83rem 1rem", md: "1.03rem 1.5rem" },
                        appearance: "textfield",
                        "&::-webkit-inner-spin-button": {
                          appearance: "none",
                        },
                        "&::-webkit-outer-spin-button": {
                          appearance: "none",
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: birthDateErrors.yearError
                          ? "error.main"
                          : "hsl(0, 0%, 86%)",
                      },
                      "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "1px",
                        },
                      },
                    },
                  }}
                />
                {birthDateErrors.yearError && (
                  <Typography
                    variant="body2"
                    lineHeight={1}
                    fontStyle="italic"
                    color="error.main"
                    marginBlockStart=".75rem"
                  >
                    {birthDateErrors.yearError}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Box
              display="flex"
              justifyContent={{ xs: "center", md: "flex-end" }}
              sx={{
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: 0,
                  width: "100%",
                  height: "1px",
                  backgroundColor: "hsl(0, 0%, 86%)",
                },
              }}
            >
              <IconButton
                aria-label="calculate-age"
                size="large"
                type="submit"
                onClick={handleCalculateAge}
                sx={{
                  width: { xs: "68px", md: "98px" },
                  height: { xs: "68px", md: "98px" },
                  marginBlock: { xs: "2rem", md: 0 },
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                  "&:focus-visible": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                <ArrowIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </Box>
          <Typography
            variant="h1"
            fontSize={{ xs: "3.25rem", md: "6.25rem" }}
            fontWeight={800}
            fontStyle="italic"
          >
            <Box component="span" color="primary.main">
              {age.ageYears ? age.ageYears : "- -"}
            </Box>
            {" years"} <br />
            <Box component="span" color="primary.main">
              {age.ageMonths ? age.ageMonths : "- -"}
            </Box>
            {" months"} <br />
            <Box component="span" color="primary.main">
              {age.ageDays ? age.ageDays : "- -"}
            </Box>
            {" days"}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
