import { useState, useRef } from "react";
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
  filteredCities,
  handleCitySearch,
}) {
  const [isFocus, setIsFocus] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const searchInputRef = useRef(null);

  const handleFocus = () => {
    setIsFocus(true);
    if (!isFocus) {
      setSearchLoading(true);
      setTimeout(() => {
        setSearchLoading(false);
      }, 750);
    }
  };

  const handleSelectCity = (city) => {
    handleChange(city);
    setIsFocus(false);
    searchInputRef.current?.focus();
  };

  return (
    <Box textAlign="center" marginBlockStart={{ xs: "3rem", lg: "4.05rem" }}>
      <Typography
        variant="h1"
        fontSize="3.25rem"
        color="hsl(0, 0%, 100%)"
        marginBlockEnd={{ xs: "3rem", lg: "4rem" }}
      >
        How's the sky looking today?
      </Typography>
      <Stack
        component="form"
        direction={{ xs: "column", md: "row" }}
        maxWidth="658px"
        marginInline="auto"
        gap={{ xs: ".75rem", md: "1rem" }}
      >
        <ClickAwayListener onClickAway={() => setIsFocus(false)}>
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
              ref={searchInputRef}
              autoComplete="off"
              fullWidth
              variant="filled"
              placeholder="Search for a place..."
              value={cityName}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={handleFocus}
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

            {isFocus && (
              <Paper
                sx={{
                  position: "absolute",
                  width: "100%",
                  maxHeight: 185,
                  top: "100%",
                  left: "0",
                  marginBlockStart: "10px",
                  borderRadius: ".5rem",
                  overflow: "auto",
                  backgroundColor: "hsl(243, 27%, 20%)",
                  color: "hsl(250, 6%, 84%)",
                  zIndex: 10,
                }}
              >
                {searchLoading && (
                  <Stack direction="row" gap=".75rem" padding="1rem">
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

                {!searchLoading &&
                  (filteredCities.length !== 0 ? (
                    <List sx={{ padding: "8px" }}>
                      {filteredCities.map((city, index) => (
                        <ListItem key={index} sx={{ padding: "0" }}>
                          <Button
                            disableRipple
                            sx={{
                              borderRadius: ".5rem",
                              width: "100%",
                              height: "40px",
                              color: "hsl(0, 0%, 100%)",
                              textTransform: "none",
                              justifyContent: "flex-start",
                              border: "1px solid transparent",
                              "&:hover": {
                                borderColor: "hsl(243, 23%, 30%)",
                                backgroundColor: "hsl(243, 23%, 24%)",
                              },
                              "&.Mui-focusVisible": {
                                borderColor: "hsl(243, 23%, 30%)",
                                backgroundColor: "hsl(243, 23%, 24%)",
                              },
                            }}
                            onClick={() => handleSelectCity(city)}
                          >
                            {city}
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body1" padding=".75rem">
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
