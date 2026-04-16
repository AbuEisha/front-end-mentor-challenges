import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Stack,
  ClickAwayListener,
  TextField,
  Paper,
  List,
  ListItem,
  Button,
} from "@mui/material";

import searchIcon from "../assets/images/icon-search.svg";
import loadingIcon from "../assets/images/icon-loading.svg";
export default function Searchbar({
  cityName,
  handleChange,
  setServerError,
  handleCitySearch,
}) {
  const [suggestedCities, setSuggestedCities] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const itemRefs = useRef([]);

  useEffect(() => {
    const getSuggestedCities = async (letters) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${letters}`,
        );
        const data = await response.json();
        if (!data.results || data.results.length === 0) {
          setSuggestedCities([]);
          return;
        }
        setSuggestedCities(data.results);
      } catch (err) {
        setServerError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (cityName.length > 2) getSuggestedCities(cityName);
  }, [cityName]);

  useEffect(() => {
    setActiveIndex(0);
    itemRefs.current = [];
  }, [suggestedCities]);

  useEffect(() => {
    if (itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  const handleChangeSearchInput = (value) => {
    handleChange(value);
    if (value.length > 2 && !isOpen) setIsOpen(true);
    else if (value.length < 3 && isOpen) setIsOpen(false);
  };

  const handleSelectCity = (city) => {
    handleChange(city);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (suggestedCities.length !== 0) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % suggestedCities.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex(
            (prev) =>
              (prev - 1 + suggestedCities.length) % suggestedCities.length,
          );
          break;
        case "Home":
          e.preventDefault();
          setActiveIndex(0);
          break;
        case "End":
          e.preventDefault();
          setActiveIndex(suggestedCities.length - 1);
          break;
        case "Enter":
          e.preventDefault();
          if (suggestedCities[activeIndex]) {
            const city = suggestedCities[activeIndex];
            handleSelectCity(`${city.name}, ${city.country}`);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          break;
        default:
          break;
      }
    }
  };

  return (
    <Box textAlign="center" marginBlockStart={{ xs: "3rem", lg: "4.05rem" }}>
      <Typography
        variant="h1"
        fontSize="3.25rem"
        color="hsl(0, 0%, 100%)"
        marginBlockEnd={{ xs: "3rem", lg: "4rem" }}
      >
        {`How's the sky looking today?`}
      </Typography>
      <Stack
        component="form"
        direction={{ xs: "column", md: "row" }}
        maxWidth="658px"
        marginInline="auto"
        gap={{ xs: ".75rem", md: "1rem" }}
      >
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
          <Box flex={1} position="relative">
            <Box
              component="img"
              src={searchIcon}
              alt="Search Icon"
              sx={{
                position: "absolute",
                left: "20px",
                top: "18px",
                zIndex: "1",
              }}
            />
            <TextField
              autoComplete="off"
              fullWidth
              variant="filled"
              placeholder="Search for a place..."
              value={cityName}
              onChange={(e) => handleChangeSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                "& .MuiInputBase-root": {
                  fontSize: "18px",
                  fontWeight: 500,
                  borderRadius: ".75rem",
                  backgroundColor: "hsl(243, 27%, 20%)",
                  "&:hover": {
                    backgroundColor: "hsl(243, 23%, 24%)",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "hsl(243, 27%, 20%)",
                    outline: "2px solid hsl(0, 0%, 100%)",
                    outlineOffset: "2px",
                    "&:after": {
                      border: "none",
                      transform: "scaleX(0)",
                    },
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "hsl(250, 6%, 84%)",
                  opacity: 1,
                },
                "& input": {
                  boxSizing: "border-box",
                  height: "56px",
                  color: "hsl(250, 6%, 84%)",
                  padding: "12px 12px 12px 56px",
                },
              }}
            />

            {isOpen && (
              <Paper
                sx={{
                  position: "absolute",
                  width: "100%",
                  paddingBlock: ".5rem",
                  top: "100%",
                  left: "0",
                  marginBlockStart: "10px",
                  borderRadius: ".5rem",
                  backgroundColor: "hsl(243, 27%, 20%)",
                  color: "hsl(250, 6%, 84%)",
                  zIndex: 10,
                }}
              >
                {isLoading && (
                  <Stack direction="row" gap=".75rem" padding=".5rem 1rem">
                    <Box
                      component="img"
                      src={loadingIcon}
                      alt="Loading Icon"
                      sx={{
                        animation: "1.4s linear infinite circle-loading",
                      }}
                    />
                    Search in progress
                  </Stack>
                )}

                {!isLoading &&
                  (suggestedCities.length !== 0 ? (
                    <List
                      role="listbox"
                      aria-label="Suggested Cities"
                      tabIndex={0}
                      sx={{
                        outline: "none",
                        paddingBlock: "0",
                        paddingInline: "8px",
                        maxHeight: 160,
                        overflowY: "auto",
                        "&::-webkit-scrollbar": {
                          width: "4px",
                        },
                        "&::-webkit-scrollbar-track": {
                          backgroundColor: "hsl(243, 27%, 20%)",
                          borderRadius: "6px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "hsl(243, 23%, 30%)",
                          borderRadius: "6px",
                        },
                      }}
                    >
                      {suggestedCities.map((city, index) => {
                        const isActive = index === activeIndex;
                        return (
                          <ListItem
                            key={index}
                            sx={{ padding: "0" }}
                            ref={(el) => (itemRefs.current[index] = el)}
                          >
                            <Button
                              disableRipple
                              aria-selected={isActive}
                              tabIndex={-1}
                              sx={{
                                backgroundColor: isActive
                                  ? "hsl(243, 23%, 24%)"
                                  : "transparent",
                                border: "1px solid",
                                borderColor: isActive
                                  ? "hsl(243, 23%, 30%)"
                                  : "transparent",
                                borderRadius: ".5rem",
                                width: "100%",
                                height: "40px",
                                color: "hsl(0, 0%, 100%)",
                                textTransform: "none",
                                justifyContent: "flex-start",
                                "&:hover": {
                                  borderColor: "hsl(243, 23%, 30%)",
                                  backgroundColor: "hsl(243, 23%, 24%)",
                                },
                                "&.Mui-focusVisible": {
                                  borderColor: "hsl(243, 23%, 30%)",
                                  backgroundColor: "hsl(243, 23%, 24%)",
                                },
                              }}
                              onClick={() =>
                                handleSelectCity(
                                  `${city.name}, ${city.country}`,
                                )
                              }
                            >
                              {`${city.name}, ${city.country}`}
                            </Button>
                          </ListItem>
                        );
                      })}
                    </List>
                  ) : (
                    <Typography variant="body1" padding=".25rem">
                      There is no result
                    </Typography>
                  ))}
              </Paper>
            )}
          </Box>
        </ClickAwayListener>
        <Button
          type="submit"
          disableRipple
          onClick={handleCitySearch}
          sx={{
            width: { xs: "100%", md: "115px" },
            height: "56px",
            backgroundColor: "hsl(233, 67%, 56%)",
            color: "hsl(250, 6%, 84%)",
            textTransform: "none",
            fontSize: "1.25rem",
            borderRadius: ".75rem",
            "&:hover": {
              backgroundColor: "hsl(248, 70%, 36%)",
            },
            "&.Mui-focusVisible": {
              outline: "2px solid hsl(233, 67%, 56%)",
              outlineOffset: "2px",
              "&:hover": {
                backgroundColor: "hsl(233, 67%, 56%)",
              },
            },
          }}
        >
          Search
        </Button>
      </Stack>
    </Box>
  );
}
