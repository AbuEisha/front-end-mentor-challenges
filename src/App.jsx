import "./App.css";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
  Button,
  Stack,
  Container,
  Grid,
} from "@mui/material";

import { useState } from "react";
import CustomDropdownList from "./CustomDropdownList";

import LogoIcon from "./assets/images/logo.svg?react";
import MenuIcon from "./assets/images/icon-menu.svg?react";
import CloseMenuIcon from "./assets/images/icon-close-menu.svg?react";
import heroImageDesktop from "./assets/images/image-hero-desktop.png";
import heroImageMobile from "./assets/images/image-hero-mobile.png";
import databizLogo from "./assets/images/client-databiz.svg";
import audiophileLogo from "./assets/images/client-audiophile.svg";
import meetLogo from "./assets/images/client-meet.svg";
import makerLogo from "./assets/images/client-maker.svg";

const drawerWidth = 250;
const navItems = [
  {
    name: "Features",
    dropdownItems: ["Todo List", "Calendar", "Reminders", "Planning"],
  },
  { name: "Company", dropdownItems: ["History", "Our Team", "Blog"] },
  { name: "Careers", dropdownItems: null },
  { name: "About", dropdownItems: null },
];

function App(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box sx={{ textAlign: "end", padding: "1.5rem" }}>
      <IconButton sx={{ padding: 0 }} onClick={handleDrawerToggle}>
        <CloseMenuIcon />
      </IconButton>

      <List sx={{ marginBlockStart: "1rem" }}>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            {item.dropdownItems ? (
              <CustomDropdownList
                name={item.name}
                dropdownItems={item.dropdownItems}
              />
            ) : (
              <Button
                fullWidth
                disableRipple
                sx={{
                  paddingBlock: ".5rem",
                  paddingInline: 0,
                  fontSize: "15px",
                  textTransform: "none",
                  justifyContent: "flex-start",
                  color: "hsl(0, 0%, 41%)",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "hsl(0, 0%, 8%)",
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "transparent",
                    color: "hsl(0, 0%, 8%)",
                  },
                }}
              >
                {item.name}
              </Button>
            )}
          </ListItem>
        ))}
      </List>
      <Stack>
        <Button
          disableRipple
          sx={{
            padding: ".75rem",
            textTransform: "none",
            color: "hsl(0, 0%, 41%)",
            "&:hover": {
              backgroundColor: "transparent",
              color: "hsl(0, 0%, 8%)",
            },
            "&.Mui-focusVisible": {
              backgroundColor: "transparent",
              color: "hsl(0, 0%, 8%)",
            },
          }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          disableRipple
          sx={{
            padding: ".5rem",
            border: "2px solid hsl(0, 0%, 41%)",
            borderRadius: ".75rem",
            textTransform: "none",
            color: "hsl(0, 0%, 41%)",
            "&:hover": {
              backgroundColor: "transparent",
              color: "hsl(0, 0%, 8%)",
              borderColor: "hsl(0, 0%, 8%)",
            },
            "&.Mui-focusVisible": {
              backgroundColor: "transparent",
              color: "hsl(0, 0%, 8%)",
              borderColor: "hsl(0, 0%, 8%)",
            },
          }}
        >
          Register
        </Button>
      </Stack>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "hsl(0, 0%, 98%)",
      }}
      minHeight="100vh"
    >
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar
          sx={{
            justifyContent: { xs: "space-between", md: "flex-start" },
            gap: "38px",
            minHeight: { xs: "66px", md: "83px" },
            paddingInline: { lg: "2.5rem" },
          }}
        >
          <LogoIcon />
          <IconButton
            color="inherit"
            aria-label={mobileOpen ? "close drawer" : "open drawer"}
            aria-expanded={mobileOpen}
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ padding: 0, m: 0, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            component="nav"
            sx={{
              display: { xs: "none", md: "flex", alignItems: "center" },
              flexGrow: 1,
            }}
          >
            <List sx={{ display: "flex", flexGrow: 1 }}>
              {navItems.map((item) => (
                <ListItem key={item.name} disablePadding sx={{ width: "auto" }}>
                  {item.dropdownItems ? (
                    <CustomDropdownList
                      name={item.name}
                      dropdownItems={item.dropdownItems}
                    />
                  ) : (
                    <Button
                      disableRipple
                      sx={{
                        paddingInline: "1.25rem",
                        marginInlineStart: ".25rem",
                        fontSize: "15px",
                        textTransform: "none",
                        justifyContent: "flex-start",
                        color: "hsl(0, 0%, 41%)",
                        "&:hover": {
                          backgroundColor: "transparent",
                          color: "hsl(0, 0%, 8%)",
                        },
                        "&.Mui-focusVisible": {
                          backgroundColor: "transparent",
                          color: "hsl(0, 0%, 8%)",
                        },
                      }}
                    >
                      {item.name}
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
            <Stack direction="row" gap={2}>
              <Button
                disableRipple
                sx={{
                  paddingInline: "1.5rem",
                  paddingBlock: "6px",
                  textTransform: "none",
                  color: "hsl(0, 0%, 41%)",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "hsl(0, 0%, 8%)",
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "transparent",
                    color: "hsl(0, 0%, 8%)",
                  },
                }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                disableRipple
                sx={{
                  paddingInline: "1.5rem",
                  paddingBlock: "8px",
                  border: "2px solid hsl(0, 0%, 41%)",
                  borderRadius: ".75rem",
                  textTransform: "none",
                  color: "hsl(0, 0%, 41%)",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "hsl(0, 0%, 8%)",
                    borderColor: "hsl(0, 0%, 8%)",
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "transparent",
                    color: "hsl(0, 0%, 8%)",
                    borderColor: "hsl(0, 0%, 8%)",
                  },
                }}
              >
                Register
              </Button>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "hsl(0, 0%, 98%)",
          },
        }}
        slotProps={{
          paper: {
            "aria-label": "Navigation menu",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ p: 0 }} flexGrow={1}>
        <Container
          sx={{
            maxWidth: { lg: "1145px" },
            textAlign: { xs: "center", md: "start" },
            "&&": { paddingInline: { xs: 0, md: "1.5rem", lg: 0 } },
            paddingBlockStart: { xs: "66px", md: "83px" },
          }}
        >
          <Grid
            container
            justifyContent="space-between"
            alignItems="flex-end"
            paddingBlockStart={{ xs: ".5rem", md: "2.75rem" }}
            rowGap="3.5rem"
            columnSpacing={{ md: "6rem", lg: 0 }}
          >
            <Grid size={{ xs: 12, md: 6, lg: 5 }} order={{ xs: 1, md: 0 }}>
              <Box paddingInline={{ xs: "1rem", md: 0 }}>
                <Box>
                  <Typography
                    variant="h1"
                    fontSize={{ xs: "2.2rem", md: "3.5rem", lg: "4.55rem" }}
                    lineHeight={1.135}
                    fontWeight={700}
                    color="hsl(0, 0%, 8%)"
                  >
                    Make remote work
                  </Typography>
                  <Typography
                    variant="body1"
                    fontSize={{ md: "17px" }}
                    lineHeight={1.6}
                    fontWeight={500}
                    color="hsl(0, 0%, 41%)"
                    marginBlock={{ xs: "1rem 1.75rem", md: "2.75rem 3rem" }}
                    width={{ xs: "auto", lg: "450px" }}
                  >
                    Get your team in sync, no matter your location. Streamline
                    processes, create team rituals, and watch productivity soar.
                  </Typography>
                  <Button
                    variant="contained"
                    disableRipple
                    sx={{
                      backgroundColor: "hsl(0, 0%, 8%)",
                      paddingInline: "1.75rem",
                      paddingBlock: ".75rem",
                      border: "1px solid transparent",
                      borderRadius: ".75rem",
                      fontSize: "18px",
                      fontWeight: 700,
                      textTransform: "none",
                      color: "white",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "hsl(0, 0%, 8%)",
                        borderColor: "hsl(0, 0%, 8%)",
                        boxShadow: "none",
                      },
                      "&.Mui-focusVisible": {
                        backgroundColor: "transparent",
                        color: "hsl(0, 0%, 8%)",
                        borderColor: "hsl(0, 0%, 8%)",
                      },
                    }}
                  >
                    Learn more
                  </Button>
                </Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  marginBlockStart={{ xs: "3rem", md: "6.45rem" }}
                  gap="1.75rem"
                >
                  <Box>
                    <Box
                      component="img"
                      src={databizLogo}
                      alt="Databiz Logo"
                      display="block"
                      maxWidth="100%"
                    />
                  </Box>
                  <Box>
                    <Box
                      component="img"
                      src={audiophileLogo}
                      alt="Audiophile Logo"
                      display="block"
                      maxWidth="100%"
                    />
                  </Box>
                  <Box>
                    <Box
                      component="img"
                      src={meetLogo}
                      alt="Meet Logo"
                      display="block"
                      maxWidth="100%"
                    />
                  </Box>
                  <Box>
                    <Box
                      component="img"
                      src={makerLogo}
                      alt="Maker Logo"
                      display="block"
                      maxWidth="100%"
                    />
                  </Box>
                </Stack>
              </Box>
            </Grid>
            <Grid
              size={{ xs: 12, md: 6, lg: 5 }}
              order={{ xs: 0, md: 1 }}
              flexGrow={1}
            >
              <Box
                component="img"
                src={heroImageMobile}
                alt="Hero Image Mobile"
                display={{ xs: "block", md: "none" }}
                maxWidth="100%"
                marginInline="auto"
              />
              <Box
                component="img"
                src={heroImageDesktop}
                alt="Hero Image Desktop"
                display={{ xs: "none", md: "block" }}
                maxWidth="100%"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
