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
export default function AppHeader({
  unitsSystem,
  changeUnitsSystem,
  handleChangeTemperatureUnit,
  handleChangeWindUnit,
  handleChangePrecipitationUnit,
}) {
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

  const handleChangeTempUnit = (unit) => {
    handleChangeTemperatureUnit(unit);
    handleCloseMenu();
  };
  const handleChangeWind = (unit) => {
    handleChangeWindUnit(unit);
    handleCloseMenu();
  };
  const handleChangePrecipitation = (unit) => {
    handleChangePrecipitationUnit(unit);
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
          role="menu"
          aria-label="Units Settings"
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
            {`Switch to ${unitsSystem.system === "metric" ? "Imperial" : "Metric"}`}
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
            onClick={() => handleChangeTempUnit("celsius")}
            sx={{
              height: "40px",
              padding: "8px",
              backgroundColor:
                unitsSystem.units.temp === "celsius"
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
              "&.Mui-focusVisible": {
                backgroundColor: "hsl(243, 23%, 24%)",
              },
            }}
          >
            {`Celsius (°C)`}
            {unitsSystem.units.temp === "celsius" && (
              <Box component="img" src={checkmarkIcon} alt="Checkmark Icon" />
            )}
          </MenuItem>
          <MenuItem
            onClick={() => handleChangeTempUnit("fahrenheit")}
            sx={{
              height: "40px",
              padding: "8px",
              backgroundColor:
                unitsSystem.units.temp === "fahrenheit"
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
              "&.Mui-focusVisible": {
                backgroundColor: "hsl(243, 23%, 24%)",
              },
            }}
          >
            {`Fahrenheit (°F)`}
            {unitsSystem.units.temp === "fahrenheit" && (
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
            onClick={() => handleChangeWind("km/h")}
            sx={{
              height: "40px",
              padding: "8px",
              backgroundColor:
                unitsSystem.units.wind === "km/h"
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
              "&.Mui-focusVisible": {
                backgroundColor: "hsl(243, 23%, 24%)",
              },
            }}
          >
            {`km/h`}
            {unitsSystem.units.wind === "km/h" && (
              <Box component="img" src={checkmarkIcon} alt="Checkmark Icon" />
            )}
          </MenuItem>
          <MenuItem
            onClick={() => handleChangeWind("mph")}
            sx={{
              height: "40px",
              padding: "8px",
              backgroundColor:
                unitsSystem.units.wind === "mph"
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
              "&.Mui-focusVisible": {
                backgroundColor: "hsl(243, 23%, 24%)",
              },
            }}
          >
            mph
            {unitsSystem.units.wind === "mph" && (
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
            onClick={() => handleChangePrecipitation("mm")}
            sx={{
              height: "40px",
              padding: "8px",
              backgroundColor:
                unitsSystem.units.precipitation === "mm"
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
              "&.Mui-focusVisible": {
                backgroundColor: "hsl(243, 23%, 24%)",
              },
            }}
          >
            {`Millimeters (mm)`}
            {unitsSystem.units.precipitation === "mm" && (
              <Box component="img" src={checkmarkIcon} alt="Checkmark Icon" />
            )}
          </MenuItem>
          <MenuItem
            onClick={() => handleChangePrecipitation("inch")}
            sx={{
              height: "40px",
              padding: "8px",
              backgroundColor:
                unitsSystem.units.precipitation === "inch"
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
              "&.Mui-focusVisible": {
                backgroundColor: "hsl(243, 23%, 24%)",
              },
            }}
          >
            {`Inches (in)`}
            {unitsSystem.units.precipitation === "inch" && (
              <Box component="img" src={checkmarkIcon} alt="Checkmark Icon" />
            )}
          </MenuItem>
        </Menu>
      </Box>
    </Stack>
  );
}
