import { useEffect, useMemo, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import dayjs from "dayjs";

import "./App.css";

import errorIcon from "./assets/images/icon-error.svg";
import retryIcon from "./assets/images/icon-retry.svg";

import AppHeader from "./components/AppHeader";
import Searchbar from "./components/Searchbar";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  const [unitsSystem, setUnitsSystem] = useState({
    system: "metric",
    units: { temp: "celsius", wind: "km/h", precipitation: "mm" },
  });
  const [cityName, setCityName] = useState("");
  const [choosingDay, setChoosingDay] = useState(dayjs().format("dddd"));
  const [cityWeather, setCityWeather] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(null);
  const [cityError, setCityError] = useState(false);
  const [searchedCities, setSearchedCities] = useState(["berlin"]);

  useEffect(() => {
    if (cityWeather.city) getCityWeather(cityWeather.city);
  }, [unitsSystem]);
  useEffect(() => {
    getCityWeather("berlin");
  }, []);

  const filteredCities = useMemo(
    () =>
      searchedCities.filter((city) =>
        city.toLowerCase().includes(cityName.toLowerCase()),
      ),
    [cityName],
  );

  async function getCityWeather(city) {
    try {
      if (cityWeather.city !== city) setIsLoading(true);
      if (choosingDay !== dayjs().format("dddd"))
        setChoosingDay(dayjs().format("dddd"));
      if (cityError) setCityError(false);
      const response1 = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`,
      );
      const cityInfo = await response1.json();
      if (!cityInfo.results || cityInfo.results.length === 0) {
        setCityError(true);
        setIsLoading(false);
        setCityWeather({});
        setCityName("");
        return;
      }
      const { name, country, latitude, longitude } = cityInfo.results[0];

      const response2 = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&temperature_unit=${unitsSystem.units.temp}&wind_speed_unit=${unitsSystem.units.wind.replace("/", "")}&precipitation_unit=${unitsSystem.units.precipitation}&timezone=auto&forecast_days=7`,
      );

      const weatherData = await response2.json();

      setCityWeather({
        city: name,
        country: country,
        current: weatherData.current,
        daily: weatherData.daily,
        hourly: weatherData.hourly,
      });

      const isFound = searchedCities.filter(
        (searchedCity) => searchedCity.toLowerCase() === name.toLowerCase(),
      );
      if (isFound.length === 0) setSearchedCities((prev) => [...prev, name]);
      setCityName("");
    } catch (err) {
      setServerError(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChangeCityValue = (value) => {
    setCityName(value);
  };

  const handleCitySearch = (e) => {
    e.preventDefault();
    if (!cityName.trim()) return;
    getCityWeather(cityName);
  };

  const handleRetryApi = () => {
    setServerError(null);
    getCityWeather(cityName);
  };

  const handleChangeUnits = () => {
    setUnitsSystem((prev) => {
      if (prev.system === "metric")
        return {
          ...prev,
          system: "imperial",
          units: { temp: "fahrenheit", wind: "mph", precipitation: "inch" },
        };
      else
        return {
          ...prev,
          system: "metric",
          units: { temp: "celsius", wind: "km/h", precipitation: "mm" },
        };
    });
  };

  const handleChangeTemperatureUnit = (unit) => {
    setUnitsSystem((prev) => {
      if (
        prev.units.wind === "km/h" &&
        prev.units.precipitation === "mm" &&
        unit === "celsius"
      ) {
        return {
          ...prev,
          system: "metric",
          units: { temp: "celsius", wind: "km/h", precipitation: "mm" },
        };
      } else if (
        prev.units.wind === "mph" &&
        prev.units.precipitation === "inch" &&
        unit === "fahrenheit"
      ) {
        return {
          ...prev,
          system: "imperial",
          units: { temp: "fahrenheit", wind: "mph", precipitation: "inch" },
        };
      } else
        return {
          ...prev,
          units: {
            ...prev.units,
            temp: unit === "celsius" ? "celsius" : "fahrenheit",
          },
        };
    });
  };
  const handleChangeWindUnit = (unit) => {
    setUnitsSystem((prev) => {
      if (
        prev.units.temp === "celsius" &&
        prev.units.precipitation === "mm" &&
        unit === "km/h"
      ) {
        return {
          ...prev,
          system: "metric",
          units: { temp: "celsius", wind: "km/h", precipitation: "mm" },
        };
      } else if (
        prev.units.temp === "fahrenheit" &&
        prev.units.precipitation === "inch" &&
        unit === "mph"
      ) {
        return {
          ...prev,
          system: "imperial",
          units: { temp: "fahrenheit", wind: "mph", precipitation: "inch" },
        };
      } else
        return {
          ...prev,
          units: { ...prev.units, wind: unit === "km/h" ? "km/h" : "mph" },
        };
    });
  };
  const handleChangePrecipitationUnit = (unit) => {
    setUnitsSystem((prev) => {
      if (
        prev.units.wind === "km/h" &&
        prev.units.temp === "celsius" &&
        unit === "mm"
      ) {
        return {
          ...prev,
          system: "metric",
          units: { temp: "celsius", wind: "km/h", precipitation: "mm" },
        };
      } else if (
        prev.units.wind === "mph" &&
        prev.units.temp === "fahrenheit" &&
        unit === "inch"
      ) {
        return {
          ...prev,
          system: "imperial",
          units: { temp: "fahrenheit", wind: "mph", precipitation: "inch" },
        };
      } else
        return {
          ...prev,
          units: {
            ...prev.units,
            precipitation: unit === "mm" ? "mm" : "inch",
          },
        };
    });
  };
  const handleChangeDay = (day) => {
    setChoosingDay(day);
  };
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        backgroundColor: "hsl(243, 96%, 9%)",
        paddingBlock: { xs: "1rem 3rem", md: "3rem 5rem" },
      }}
    >
      <Container sx={{ maxWidth: { lg: "1265px" } }}>
        <AppHeader
          unitsSystem={unitsSystem}
          changeUnitsSystem={handleChangeUnits}
          handleChangeTemperatureUnit={handleChangeTemperatureUnit}
          handleChangeWindUnit={handleChangeWindUnit}
          handleChangePrecipitationUnit={handleChangePrecipitationUnit}
        />

        {serverError && (
          <Box
            textAlign="center"
            maxWidth="460px"
            marginInline="auto"
            marginBlockStart="5rem"
          >
            <Box
              component="img"
              src={errorIcon}
              alt="Error Icon"
              width="36px"
            />
            <Typography
              variant="h1"
              fontSize="2.5rem"
              color="hsl(0, 0%, 100%)"
              marginBlock="1.25rem"
            >
              Something went wrong
            </Typography>
            <Typography variant="body1" color="hsl(250, 6%, 84%)">
              We couldn't connect to the server (API error). Please try again in
              a few moments.
            </Typography>
            <Button
              disableRipple
              sx={{
                backgroundColor: "hsl(243, 27%, 20%)",
                color: "hsl(250, 6%, 84%)",
                textTransform: "none",
                gap: ".5rem",
                padding: "6px 14px",
                borderRadius: ".5rem",
                marginBlockStart: "1.25rem",
                "&:hover": {
                  backgroundColor: "hsl(243, 23%, 24%)",
                },
                "&.Mui-focusVisible": {
                  backgroundColor: "hsl(243, 23%, 24%)",
                  outline: "2px solid hsl(0, 0%, 100%)",
                  outlineOffset: "2px",
                },
              }}
              onClick={handleRetryApi}
            >
              <Box component="img" src={retryIcon} alt="Retry Icon" />
              Retry
            </Button>
          </Box>
        )}

        {!serverError && (
          <Box>
            <Searchbar
              cityName={cityName}
              handleChange={handleChangeCityValue}
              filteredCities={filteredCities}
              handleCitySearch={handleCitySearch}
            />
            {cityError && (
              <Typography
                variant="body1"
                textAlign="center"
                fontSize="1.5rem"
                fontWeight={600}
                marginBlockStart="2.25rem"
                color="hsl(0, 0%, 100%)"
              >
                No search result found!
              </Typography>
            )}
            {!cityError && (
              <WeatherDetails
                choosingDay={choosingDay}
                handleChangeDay={handleChangeDay}
                isLoading={isLoading}
                cityWeather={cityWeather}
                unitsSystem={unitsSystem}
              />
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;
