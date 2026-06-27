import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  Button,
  MenuItem,
  List,
  ListItem,
} from "@mui/material";

import MenuIcon from "../assets/images/icon-hamburger.svg?react";
import CloseMenuIcon from "../assets/images/icon-close.svg?react";
import Logo from "../assets/images/logo.svg?react";
import CustomButton from "./CustomButton";

const pages = ["Pricing", "Product", "About Us", "Careers", "Community"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Toolbar disableGutters sx={{ "&&": { minHeight: "auto" } }}>
        <Logo />

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
            justifyContent: { xs: "flex-end", md: "normal" },
          }}
        >
          {anchorElNav ? (
            <IconButton
              disableRipple
              size="large"
              aria-label="Close Nav Links"
              onClick={handleCloseNavMenu}
              color="inherit"
              sx={{ padding: 0 }}
            >
              <CloseMenuIcon />
            </IconButton>
          ) : (
            <IconButton
              disableRipple
              size="large"
              aria-label="Show Nav Links"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ padding: 0 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
              backgroundColor: "hsl(233deg 12% 13% / 40%)",
              "& .MuiPaper-root": {
                backgroundColor: "white",
                padding: "2rem 0",
                minWidth: "calc(100% - 48px)",
                maxWidth: "calc(100% - 48px)",
                marginInlineStart: "-8px",
                marginBlockStart: "2.5rem",
                boxShadow: "none",
              },
              "& .MuiList-root": {
                padding: 0,
              },
            }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page}
                sx={{
                  padding: "0",
                  lineHeight: 1,
                  minHeight: "auto",
                  "&:hover": { backgroundColor: "transparent" },
                }}
              >
                <Button
                  disableRipple
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "text.primary",
                    textTransform: "none",
                    padding: "15px 0",
                    width: "100%",
                    textAlign: "center",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "primary.main",
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: "transparent",
                      color: "primary.main",
                    },
                  }}
                >
                  {page}
                </Button>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <List
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            p: 0,
          }}
        >
          {pages.map((page) => (
            <ListItem key={page} sx={{ p: 0, width: "auto" }}>
              <Button
                onClick={handleCloseNavMenu}
                disableRipple
                sx={{
                  fontSize: "13px",
                  color: "text.primary",
                  display: "block",
                  textTransform: "none",
                  paddingInline: "17px",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "text.secondary",
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "transparent",
                    color: "text.secondary",
                  },
                }}
              >
                {page}
              </Button>
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <CustomButton color="primary.main" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
