import { useState } from "react";
import {
  Stack,
  Box,
  Button,
  Menu,
  MenuItem,
  ListSubheader,
  Divider,
} from "@mui/material";

import logo from "../assets/images/logo.svg";
import unitsIcon from "../assets/images/icon-units.svg";
import dropdownIcon from "../assets/images/icon-dropdown.svg";
import checkmarkIcon from "../assets/images/icon-checkmark.svg";
export default function AppHeader({ unitsSystem, changeUnitsSystem }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleChangeUnits = () => {
    changeUnitsSystem();
    handleCloseMenu();
  };

  const handleSetMetric = () => {
    if (unitsSystem !== "metric") changeUnitsSystem();
    handleCloseMenu();
  };

  const handleSetImperial = () => {
    if (unitsSystem !== "imperial") changeUnitsSystem();
    handleCloseMenu();
  };
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
    >
      <Box
        component="img"
        src={logo}
        alt="Weather App Logo"
        width={{ xs: "138px", sm: "auto" }}
      />
      <Box>
        <Button
          id="units-system-toggle"
          aria-controls={openMenu ? "units-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={handleOpenMenu}
          disableRipple
          sx={{
            backgroundColor: "hsl(243, 27%, 20%)",
            color: "hsl(250, 6%, 84%)",
            textTransform: "none",
            borderRadius: ".5rem",
            width: { xs: "96px", md: "120px" },
            height: { xs: "34px", sm: "40px" },
            gap: { xs: "6px", md: "10px" },
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
          <Box component="img" src={unitsIcon} alt="Units Icon" />
          Units
          <Box component="img" src={dropdownIcon} alt="Dropdown Icon" />
        </Button>
        <Menu
          id="units-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          slotProps={{
            list: {
              "aria-labelledby": "units-system-toggle",
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
              marginInlineStart: { xs: "-15px", sm: "-23px", lg: "-96px" },
              marginBlockStart: "10px",
            },
          }}
        >
          <MenuItem
            onClick={handleChangeUnits}
            sx={{
              height: "40px",
              padding: "8px",
              color: "hsl(0, 0%, 100%)",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "hsl(243, 23%, 24%)",
              },
              "&.Mui-focusVisible": {
                backgroundColor: "hsl(243, 23%, 24%)",
                outline: "1px solid hsl(0, 0%, 100%)",
                outlineOffset: "2px",
              },
            }}
          >
            {`Switch to ${unitsSystem === "metric" ? "Imperial" : "Metric"}`}
          </MenuItem>
          <ListSubheader
            sx={{
              backgroundColor: "transparent",
              color: "hsl(240, 6%, 70%)",
              fontSize: "12px",
              fontWeight: 600,
              lineHeight: "2rem",
              paddingInline: "8px",
            }}
          >
            Temperature
          </ListSubheader>
          <MenuItem
            onClick={handleSetMetric}
            sx={{
              height: "40px",
              padding: "8px",
              backgroundColor:
                unitsSystem === "metric" ? "hsl(243, 23%, 24%)" : "transparent",
              color: "hsl(0, 0%, 100%)",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "6px",
              justifyContent: "space-between",
              "&:hover": {
                backgroundColor: "hsl(243, 23%, 24%)",
              },
            }}
          >
            Celsius (°C)
            {unitsSystem === "metric" && (
              <Box component="img" src={checkmarkIcon} alt="Checkmark Icon" />
            )}
          </MenuItem>
          <MenuItem
            onClick={handleSetImperial}
            sx={{
              height: "40px",
              padding: "8px",
              backgroundColor:
                unitsSystem === "imperial"
                  ? "hsl(243, 23%, 24%)"
                  : "transparent",
              color: "hsl(0, 0%, 100%)",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "6px",
              justifyContent: "space-between",
              "&:hover": {
                backgroundColor: "hsl(243, 23%, 24%)",
              },
            }}
          >
            Fahrenheit (°F)
            {unitsSystem === "imperial" && (
              <Box component="img" src={checkmarkIcon} alt="Checkmark Icon" />
            )}
          </MenuItem>
          <Divider sx={{ borderColor: "hsl(243, 23%, 30%)" }} />
          <ListSubheader
            sx={{
              backgroundColor: "transparent",
              color: "hsl(240, 6%, 70%)",
              fontSize: "12px",
              fontWeight: 600,
              lineHeight: "2rem",
              paddingInline: "8px",
            }}
          >
            Wind Speed
          </ListSubheader>
          <MenuItem
            onClick={handleSetMetric}
            sx={{
              height: "40px",
              padding: "8px",
              backgroundColor:
                unitsSystem === "metric" ? "hsl(243, 23%, 24%)" : "transparent",
              color: "hsl(0, 0%, 100%)",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "6px",
              justifyContent: "space-between",
              "&:hover": {
                backgroundColor: "hsl(243, 23%, 24%)",
              },
            }}
          >
            km/h
            {unitsSystem === "metric" && (
              <Box component="img" src={checkmarkIcon} alt="Checkmark Icon" />
            )}
          </MenuItem>
          <MenuItem
            onClick={handleSetImperial}
            sx={{
              height: "40px",
              padding: "8px",
              backgroundColor:
                unitsSystem === "imperial"
                  ? "hsl(243, 23%, 24%)"
                  : "transparent",
              color: "hsl(0, 0%, 100%)",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "6px",
              justifyContent: "space-between",
              "&:hover": {
                backgroundColor: "hsl(243, 23%, 24%)",
              },
            }}
          >
            mph
            {unitsSystem === "imperial" && (
              <Box component="img" src={checkmarkIcon} alt="Checkmark Icon" />
            )}
          </MenuItem>
          <Divider sx={{ borderColor: "hsl(243, 23%, 30%)" }} />
          <ListSubheader
            sx={{
              backgroundColor: "transparent",
              color: "hsl(240, 6%, 70%)",
              fontSize: "12px",
              fontWeight: 600,
              lineHeight: "2rem",
              paddingInline: "8px",
            }}
          >
            Precipitation
          </ListSubheader>
          <MenuItem
            onClick={handleSetMetric}
            sx={{
              height: "40px",
              padding: "8px",
              backgroundColor:
                unitsSystem === "metric" ? "hsl(243, 23%, 24%)" : "transparent",
              color: "hsl(0, 0%, 100%)",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "6px",
              justifyContent: "space-between",
              "&:hover": {
                backgroundColor: "hsl(243, 23%, 24%)",
              },
            }}
          >
            Millimeters (mm)
            {unitsSystem === "metric" && (
              <Box component="img" src={checkmarkIcon} alt="Checkmark Icon" />
            )}
          </MenuItem>
          <MenuItem
            onClick={handleSetImperial}
            sx={{
              height: "40px",
              padding: "8px",
              backgroundColor:
                unitsSystem === "imperial"
                  ? "hsl(243, 23%, 24%)"
                  : "transparent",
              color: "hsl(0, 0%, 100%)",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "6px",
              justifyContent: "space-between",
              "&:hover": {
                backgroundColor: "hsl(243, 23%, 24%)",
              },
            }}
          >
            Inches (in)
            {unitsSystem === "imperial" && (
              <Box component="img" src={checkmarkIcon} alt="Checkmark Icon" />
            )}
          </MenuItem>
        </Menu>
      </Box>
    </Stack>
  );
}
