import { useMemo, useState } from "react";
import {
  Grid,
  Box,
  Stack,
  Typography,
  Button,
  Menu,
  MenuItem,
  List,
  ListItem,
} from "@mui/material";
import dayjs from "dayjs";

import dropdownIcon from "../assets/images/icon-dropdown.svg";
import bgTodayLarge from "../assets/images/bg-today-large.svg";
import bgTodaySmall from "../assets/images/bg-today-small.svg";
import drizzleIcon from "../assets/images/icon-drizzle.webp";
import fogIcon from "../assets/images/icon-fog.webp";
import overcastIcon from "../assets/images/icon-overcast.webp";
import partlyCloudyIcon from "../assets/images/icon-partly-cloudy.webp";
import rainIcon from "../assets/images/icon-rain.webp";
import snowIcon from "../assets/images/icon-snow.webp";
import stormIcon from "../assets/images/icon-storm.webp";
import sunnyIcon from "../assets/images/icon-sunny.webp";

function chooseIcon(weatherCode) {
  if (weatherCode === 0) {
    return sunnyIcon;
  } else if (weatherCode === 1 || weatherCode === 2) {
    return partlyCloudyIcon;
  } else if (weatherCode === 3) {
    return overcastIcon;
  } else if (weatherCode === 45 || weatherCode === 48) {
    return fogIcon;
  } else if (
    weatherCode === 51 ||
    weatherCode === 53 ||
    weatherCode === 55 ||
    weatherCode === 56 ||
    weatherCode === 57
  ) {
    return drizzleIcon;
  } else if (
    weatherCode === 61 ||
    weatherCode === 63 ||
    weatherCode === 65 ||
    weatherCode === 66 ||
    weatherCode === 67 ||
    weatherCode === 80 ||
    weatherCode === 81 ||
    weatherCode === 82
  ) {
    return rainIcon;
  } else if (
    weatherCode === 71 ||
    weatherCode === 73 ||
    weatherCode === 75 ||
    weatherCode === 77 ||
    weatherCode === 85 ||
    weatherCode === 86
  ) {
    return snowIcon;
  } else if (weatherCode >= 95) {
    return stormIcon;
  }
}

function getAltText(weatherCode) {
  if (weatherCode === 0) {
    return "Sunny Icon";
  } else if (weatherCode === 1 || weatherCode === 2) {
    return "Partly Cloudy Icon";
  } else if (weatherCode === 3) {
    return "Overcast Icon";
  } else if (weatherCode === 45 || weatherCode === 48) {
    return "Fog Icon";
  } else if (
    weatherCode === 51 ||
    weatherCode === 53 ||
    weatherCode === 55 ||
    weatherCode === 56 ||
    weatherCode === 57
  ) {
    return "Drizzle Icon";
  } else if (
    weatherCode === 61 ||
    weatherCode === 63 ||
    weatherCode === 65 ||
    weatherCode === 66 ||
    weatherCode === 67 ||
    weatherCode === 80 ||
    weatherCode === 81 ||
    weatherCode === 82
  ) {
    return "Rain Icon";
  } else if (
    weatherCode === 71 ||
    weatherCode === 73 ||
    weatherCode === 75 ||
    weatherCode === 77 ||
    weatherCode === 85 ||
    weatherCode === 86
  ) {
    return "Snow Icon";
  } else if (weatherCode >= 95) {
    return "Storm Icon";
  }
}

export default function WeatherDetails({
  choosingDay,
  handleChangeDay,
  isLoading,
  cityWeather,
  unitsSystem,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = Boolean(anchorEl);

  const hourlyData = useMemo(() => {
    if (cityWeather.hourly) {
      const data = { time: [], temp: [], weather_code: [] };
      cityWeather.hourly.time.map((time, index) => {
        if (dayjs(time).format("dddd") === choosingDay) {
          data.time.push(time);
          data.temp.push(cityWeather.hourly.temperature_2m[index]);
          data.weather_code.push(cityWeather.hourly.weather_code[index]);
        }
      });
      return data;
    }
  }, [choosingDay, cityWeather.hourly]);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChange = (day) => {
    handleChangeDay(day);
    handleCloseMenu();
  };
  return (
    <Grid
      container
      spacing={4}
      marginBlockStart={{ xs: "2rem", sm: "1rem", md: "3rem" }}
    >
      <Grid size={{ xs: 12, lg: 8 }}>
        <Box
          component="section"
          sx={{
            height: "286px",
            borderRadius: "1rem",
            backgroundColor: !isLoading ? "transparent" : "hsl(243, 27%, 20%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoading && (
            <Box textAlign="center">
              <Stack
                direction="row"
                gap=".5rem"
                justifyContent="center"
                sx={{
                  "& div": {
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "hsl(250, 6%, 84%)",
                    animation: ".9s infinite alternate wave-loading",
                  },
                }}
              >
                <Box></Box>
                <Box sx={{ "&&": { animationDelay: ".3s" } }}></Box>
                <Box sx={{ "&&": { animationDelay: ".6s" } }}></Box>
              </Stack>
              <Typography
                variant="body1"
                fontWeight={500}
                color="hsl(250, 6%, 84%)"
                marginBlockStart=".75rem"
              >
                Loading...
              </Typography>
            </Box>
          )}

          {!isLoading && cityWeather.current && (
            <Box position="relative">
              <Box
                component="img"
                src={bgTodaySmall}
                alt="Bg Today Small"
                sx={{
                  display: { xs: "block", sm: "none" },
                  maxWidth: "100%",
                  objectFit: "cover",
                }}
              />
              <Box
                component="img"
                src={bgTodayLarge}
                alt="Bg Today Large"
                sx={{
                  display: { xs: "none", sm: "block" },
                  maxWidth: "100%",
                  objectFit: "cover",
                }}
              />
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems="center"
                gap="1rem"
                textAlign={{ xs: "center", sm: "start" }}
                justifyContent="space-between"
                paddingInline="1.5rem"
                color="hsl(0, 0%, 100%)"
                width="100%"
                sx={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <Box>
                  <Typography variant="h2" fontSize="1.75rem" fontWeight={600}>
                    {`${cityWeather.city}, ${cityWeather.country}`}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontSize="17.5px"
                    fontWeight={500}
                    color="hsl(250, 6%, 84%)"
                    marginBlockStart=".75rem"
                  >
                    {dayjs(cityWeather.current.time).format(
                      "dddd, MMM D, YYYY",
                    )}
                  </Typography>
                </Box>
                <Stack direction="row" alignItems="center" gap="2rem">
                  <Box
                    component="img"
                    src={chooseIcon(cityWeather.current.weather_code)}
                    alt={getAltText(cityWeather.current.weather_code)}
                    width="110px"
                  />
                  <Typography
                    variant="h3"
                    fontSize="5rem"
                    fontWeight={600}
                    fontStyle="italic"
                  >
                    {`${Math.round(cityWeather.current.temperature_2m)}°`}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          )}
        </Box>
        <Box
          component="section"
          marginBlockStart={{ xs: "1.25rem", sm: "1rem", md: "2rem" }}
        >
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid size={{ xs: 6, sm: 4, md: 3 }}>
              <Box
                sx={{
                  backgroundColor: "hsl(243, 27%, 20%)",
                  height: "120px",
                  padding: "1.5rem 1.25rem",
                  border: "1px solid hsl(243, 23%, 30%)",
                  borderRadius: ".75rem",
                }}
              >
                <Typography
                  variant="h4"
                  fontSize="15px"
                  fontWeight={600}
                  color="hsl(240, 6%, 70%)"
                >
                  Feels Like
                </Typography>
                <Typography
                  variant="body1"
                  fontSize="1.75rem"
                  fontWeight={300}
                  lineHeight={1}
                  color="white"
                  marginBlockStart="1.25rem"
                >
                  {`${isLoading || !cityWeather.current ? "-" : Math.round(cityWeather.current.apparent_temperature) + "°"}`}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 4, md: 3 }}>
              <Box
                sx={{
                  backgroundColor: "hsl(243, 27%, 20%)",
                  height: "120px",
                  padding: "1.5rem 1.25rem",
                  border: "1px solid hsl(243, 23%, 30%)",
                  borderRadius: ".75rem",
                }}
              >
                <Typography
                  variant="h4"
                  fontSize="15px"
                  fontWeight={600}
                  color="hsl(240, 6%, 70%)"
                >
                  Humidity
                </Typography>
                <Typography
                  variant="body1"
                  fontSize="1.75rem"
                  fontWeight={300}
                  lineHeight={1}
                  color="white"
                  marginBlockStart="1.25rem"
                >
                  {`${isLoading || !cityWeather.current ? "-" : Math.round(cityWeather.current.relative_humidity_2m) + "%"}`}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 4, md: 3 }}>
              <Box
                sx={{
                  backgroundColor: "hsl(243, 27%, 20%)",
                  height: "120px",
                  padding: "1.5rem 1.25rem",
                  border: "1px solid hsl(243, 23%, 30%)",
                  borderRadius: ".75rem",
                }}
              >
                <Typography
                  variant="h4"
                  fontSize="15px"
                  fontWeight={600}
                  color="hsl(240, 6%, 70%)"
                >
                  Wind
                </Typography>
                <Typography
                  variant="body1"
                  fontSize="1.75rem"
                  fontWeight={300}
                  lineHeight={1}
                  color="white"
                  marginBlockStart="1.25rem"
                >
                  {`${isLoading || !cityWeather.current ? "-" : Math.round(cityWeather.current.wind_speed_10m) + " " + unitsSystem.units.wind}`}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 4, md: 3 }}>
              <Box
                sx={{
                  backgroundColor: "hsl(243, 27%, 20%)",
                  height: "120px",
                  padding: "1.5rem 1.25rem",
                  border: "1px solid hsl(243, 23%, 30%)",
                  borderRadius: ".75rem",
                }}
              >
                <Typography
                  variant="h4"
                  fontSize="15px"
                  fontWeight={600}
                  color="hsl(240, 6%, 70%)"
                >
                  Precipitation
                </Typography>
                <Typography
                  variant="body1"
                  fontSize="1.75rem"
                  fontWeight={300}
                  lineHeight={1}
                  color="white"
                  marginBlockStart="1.25rem"
                >
                  {`${isLoading || !cityWeather.current ? "-" : Math.round(cityWeather.current.precipitation) + " " + (unitsSystem.units.precipitation === "mm" ? "mm" : "in")}`}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          component="section"
          marginBlockStart={{ xs: "1.9rem", md: "3rem" }}
        >
          <Typography
            variant="h5"
            fontSize="1.25rem"
            fontWeight={600}
            color="hsl(0, 0%, 100%)"
            marginBlockEnd="1.25rem"
          >
            Daily forecast
          </Typography>
          <Grid container spacing={2}>
            {Array.from({ length: 7 }).map((_, index) => (
              <Grid key={index} size={{ xs: 4, sm: 3, md: 1.71 }}>
                <Box
                  sx={{
                    backgroundColor: "hsl(243, 27%, 20%)",
                    color: "hsl(0, 0%, 100%)",
                    textAlign: "center",
                    padding: "1.25rem 10px",
                    border: "1px solid hsl(243, 23%, 30%)",
                    borderRadius: ".75rem",
                    height: "164px",
                  }}
                >
                  {!isLoading && cityWeather.daily && (
                    <Box>
                      <Typography variant="h6" fontSize="1rem">
                        {dayjs(cityWeather.daily.time[index]).format("ddd")}
                      </Typography>
                      <Box
                        component="img"
                        src={chooseIcon(cityWeather.daily.weather_code[index])}
                        alt={getAltText(cityWeather.daily.weather_code[index])}
                        width="52px"
                        marginBlock="10px"
                      />
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body1" color="hsl(250, 6%, 84%)">
                          {`${Math.round(cityWeather.daily.temperature_2m_max[index])}°`}
                        </Typography>
                        <Typography variant="body1" color="hsl(250, 6%, 84%)">
                          {`${Math.round(cityWeather.daily.temperature_2m_min[index])}°`}
                        </Typography>
                      </Stack>
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }}>
        <Box
          component="section"
          sx={{
            backgroundColor: "hsl(243, 27%, 20%)",
            paddingBlock: { xs: "1.25rem", md: "1.57rem" },
            borderRadius: ".75rem",
            overflow: "auto",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            paddingInline={{ xs: "1rem", md: "1.5rem" }}
          >
            <Typography
              variant="h5"
              fontSize="1.25rem"
              fontWeight={600}
              color="hsl(0, 0%, 100%)"
            >
              Hourly forecast
            </Typography>
            <Box>
              <Button
                id="days-toggle"
                aria-controls={openMenu ? "days-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                onClick={handleOpenMenu}
                disableRipple
                sx={{
                  backgroundColor: "hsl(243, 23%, 30%)",
                  color: "hsl(250, 6%, 84%)",
                  textTransform: "none",
                  paddingInline: "18px",
                  borderRadius: ".5rem",
                  minWidth: "122px",
                  height: "38px",
                  justifyContent: "space-between",
                  gap: ".5rem",
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "hsl(243, 23%, 24%)",
                  },
                  "&.Mui-focusVisible": {
                    outline: "2px solid hsl(0, 0%, 100%)",
                    outlineOffset: "2px",
                    backgroundColor: "hsl(243, 23%, 24%)",
                  },
                }}
              >
                {`${isLoading || !cityWeather.daily ? "-" : choosingDay}`}
                <Box component="img" src={dropdownIcon} alt="Dropdown Icon" />
              </Button>
              {!isLoading && cityWeather.daily && (
                <Menu
                  id="days-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleCloseMenu}
                  slotProps={{
                    list: {
                      "aria-labelledby": "days-toggle",
                      sx: {
                        py: 0,
                      },
                    },
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      width: "216px",
                      padding: "8px",
                      backgroundColor: "hsl(243, 27%, 20%)",
                      border: "1px solid hsl(243, 23%, 30%)",
                      borderRadius: ".75rem",
                      marginInlineStart: {
                        xs: "-35px",
                        sm: "-43px",
                        lg: "-96px",
                      },
                      marginBlockStart: "10px",
                    },
                  }}
                >
                  {Array.from({ length: 7 }).map((_, index) => (
                    <MenuItem
                      key={index}
                      onClick={() =>
                        handleChange(
                          dayjs(cityWeather.daily.time[index]).format("dddd"),
                        )
                      }
                      sx={{
                        height: "40px",
                        padding: "8px",
                        color: "hsl(0, 0%, 100%)",
                        backgroundColor:
                          dayjs(cityWeather.daily.time[index]).format(
                            "dddd",
                          ) === choosingDay
                            ? "hsl(243, 23%, 24%)"
                            : "transparent",
                        fontSize: "14px",
                        fontWeight: 500,
                        borderRadius: "6px",
                        justifyContent: "space-between",
                        "&:hover": {
                          backgroundColor: "hsl(243, 23%, 24%)",
                        },
                        "&.Mui-focusVisible": {
                          backgroundColor: "hsl(243, 23%, 24%)",
                        },
                      }}
                    >
                      {dayjs(cityWeather.daily.time[index]).format("dddd")}
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </Box>
          </Stack>
          <List
            sx={{
              paddingBlock: 0,
              paddingInline: { xs: "1rem", md: "1.5rem" },
              maxHeight: "608px",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: 4,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "hsl(243, 27%, 20%)",
                borderRadius: 4,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "hsl(243, 23%, 30%)",
                borderRadius: 4,
              },
            }}
          >
            {Array.from({ length: 24 }).map((_, index) => {
              return (
                <ListItem
                  key={index}
                  sx={{
                    backgroundColor: "hsl(243, 23%, 24%)",
                    height: "60px",
                    paddingInline: ".5rem 1rem",
                    border: "1px solid hsl(243, 23%, 30%)",
                    marginBlockStart: "16px",
                    borderRadius: ".5rem",
                  }}
                >
                  {!isLoading && cityWeather.hourly && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      width="100%"
                      height="100%"
                    >
                      <Stack direction="row" alignItems="center" gap={1}>
                        <Box
                          component="img"
                          src={chooseIcon(hourlyData.weather_code[index])}
                          alt={getAltText(hourlyData.weather_code[index])}
                          width="40px"
                        />
                        <Typography
                          variant="body1"
                          fontSize="1.25rem"
                          fontWeight={500}
                          color="hsl(0, 0%, 100%)"
                        >
                          {dayjs(hourlyData.time[index]).format("h A")}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="body1"
                        fontWeight={300}
                        color="hsl(0, 0%, 100%)"
                      >
                        {`${Math.round(hourlyData.temp[index])}°`}
                      </Typography>
                    </Stack>
                  )}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Grid>
    </Grid>
  );
}
