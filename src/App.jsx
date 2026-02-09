import { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Stack,
} from "@mui/material";
import "./App.css";

import MenuIcon from "./assets/images/icon-menu.svg?react";
import MenuIconClose from "./assets/images/icon-menu-close.svg?react";
import LogoIcon from "./assets/images/logo.svg?react";
import webImageDesktop from "./assets/images/image-web-3-desktop.jpg";
import webImageMobile from "./assets/images/image-web-3-mobile.jpg";
import pcsImage from "./assets/images/image-retro-pcs.jpg";
import laptopsImage from "./assets/images/image-top-laptops.jpg";
import gamingImage from "./assets/images/image-gaming-growth.jpg";

const drawerWidth = 256;
const navItems = ["Home", "New", "Popular", "Trending", "Categories"];

export default function App(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box padding="1.5rem 1rem 1.5rem 1.5rem" textAlign="end">
      <IconButton onClick={handleDrawerToggle}>
        <MenuIconClose />
      </IconButton>
      <List sx={{ textAlign: "start", marginBlockStart: "3rem" }}>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{
                paddingInline: 0,
                color: "primary.dark",
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
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      paddingBlock={{ xs: "1.5rem 4.5rem", md: "4.75rem 7.835rem" }}
      sx={{ backgroundColor: "primary.contrastText" }}
    >
      <Container sx={{ maxWidth: { lg: "1158px" } }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CssBaseline />
          <AppBar
            component="nav"
            position="sticky"
            sx={{
              width: "100%",
              left: "0",
              right: 0,
              boxShadow: "none",
              backgroundColor: "transparent",
            }}
          >
            <Toolbar sx={{ "&&": { paddingInline: 0 } }}>
              <Box flexGrow={1}>
                <LogoIcon />
              </Box>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ padding: 0, margin: 0, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {navItems.map((item) => (
                  <Button
                    key={item}
                    disableRipple
                    sx={{
                      color: "text.primary",
                      textTransform: "none",
                      fontSize: "15px",
                      paddingInline: "1.25rem",
                      "&:last-of-type": {
                        paddingInlineEnd: 0,
                      },
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
                    {item}
                  </Button>
                ))}
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
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>

          <Box component="main">
            <Box
              component="section"
              paddingBlock={{ xs: "1.75rem 3rem", md: "2.75rem 4.5rem" }}
            >
              <Grid container spacing={{ xs: 6, md: 4 }}>
                <Grid size={{ xs: 12, md: 8 }}>
                  <Box
                    component="img"
                    src={webImageMobile}
                    alt="Web 3.0 Image"
                    display={{ xs: "block", sm: "none" }}
                    maxWidth="100%"
                  />
                  <Box
                    component="img"
                    src={webImageDesktop}
                    alt="Web 3.0 Image"
                    display={{ xs: "none", sm: "block" }}
                    maxWidth="100%"
                  />
                  <Grid
                    container
                    marginBlockStart={{ xs: "1.75rem", md: "2rem" }}
                    spacing={{ xs: 3, md: 4 }}
                  >
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography
                        variant="h1"
                        fontSize={{ xs: "2.5rem", md: "3.75rem" }}
                        fontWeight={800}
                        lineHeight={1}
                        color="primary.dark"
                      >
                        The Bright Future of Web 3.0?
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography
                        variant="body1"
                        fontSize="15px"
                        lineHeight={1.7}
                      >
                        We dive into the next evolution of the web that claims
                        to put the power of the platforms back into the hands of
                        the people. But is it really fulfilling its promise?
                      </Typography>
                      <Button
                        sx={{
                          backgroundColor: "primary.main",
                          color: "primary.dark",
                          fontWeight: 700,
                          letterSpacing: "4px",
                          padding: ".75rem 2rem",
                          borderRadius: 0,
                          marginBlockStart: { xs: "1.5rem", md: "2.02rem" },
                          "&:hover": {
                            backgroundColor: "primary.dark",
                            color: "primary.contrastText",
                          },
                          "&.Mui-focusVisible": {
                            backgroundColor: "primary.dark",
                            color: "primary.contrastText",
                          },
                        }}
                      >
                        Read more
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box
                    component="aside"
                    padding={{ xs: "1.85rem 1.25rem", md: "2rem 1.25rem" }}
                    sx={{
                      backgroundColor: "primary.dark",
                      color: "primary.contrastText",
                    }}
                  >
                    <Typography
                      variant="h2"
                      fontSize="2.5rem"
                      fontWeight={700}
                      marginBlockEnd="1.75rem"
                      color="primary.light"
                    >
                      New
                    </Typography>
                    <Box>
                      <Typography
                        variant="h3"
                        fontSize="1.25rem"
                        fontWeight={700}
                        marginBlockEnd=".5rem"
                        sx={{
                          cursor: "pointer",
                          "&:hover": { color: "primary.light" },
                        }}
                      >
                        Hydrogen VS Electric Cars
                      </Typography>
                      <Typography
                        variant="body1"
                        lineHeight={1.7}
                        fontSize="14.85px"
                        color="text.secondary"
                      >
                        {`Will hydrogen-fueled cars ever catch up to EVs?`}
                      </Typography>
                    </Box>
                    <Divider
                      sx={{
                        borderColor: "text.primary",
                        marginBlock: "2rem",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="h3"
                        fontSize="1.25rem"
                        fontWeight={700}
                        marginBlockEnd=".5rem"
                        sx={{
                          cursor: "pointer",
                          "&:hover": { color: "primary.light" },
                        }}
                      >
                        The Downsides of AI Artistry
                      </Typography>
                      <Typography
                        variant="body1"
                        lineHeight={1.7}
                        fontSize="14.85px"
                        color="text.secondary"
                      >
                        {`What are the possible adverse effects of on-demand AI image generation?`}
                      </Typography>
                    </Box>
                    <Divider
                      sx={{
                        borderColor: "text.primary",
                        marginBlock: "2rem",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="h3"
                        fontSize="1.25rem"
                        fontWeight={700}
                        marginBlockEnd=".5rem"
                        sx={{
                          cursor: "pointer",
                          "&:hover": { color: "primary.light" },
                        }}
                      >
                        Is VC Funding Drying Up?
                      </Typography>
                      <Typography
                        variant="body1"
                        lineHeight={1.7}
                        fontSize="14.85px"
                        color="text.secondary"
                      >
                        {`Private funding by VC firms is down 50% YOY. We take a look at what that means.`}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box component="section">
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Grid container spacing={3}>
                    <Grid size={4}>
                      <Box
                        component="img"
                        src={pcsImage}
                        alt="Pcs Image Retro"
                        display="block"
                        maxWidth="100%"
                      />
                    </Grid>
                    <Grid size={8} flex={1}>
                      <Typography
                        variant="h2"
                        fontSize="2rem"
                        fontWeight={700}
                        lineHeight={1}
                        color="primary.main"
                      >
                        01
                      </Typography>
                      <Typography
                        variant="h3"
                        fontSize="1.14rem"
                        fontWeight={700}
                        lineHeight={1}
                        color="primary.dark"
                        sx={{
                          marginBlock: { xs: ".75rem", md: ".8rem" },
                          cursor: "pointer",
                          "&:hover": { color: "primary.main" },
                        }}
                      >
                        Reviving Retro PCs
                      </Typography>
                      <Typography
                        variant="body1"
                        fontSize="15px"
                        lineHeight={1.7}
                      >
                        What happens when old PCs are given modern upgrades?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Grid container spacing={3}>
                    <Grid size={4}>
                      <Box
                        component="img"
                        src={laptopsImage}
                        alt="Laptops Top Image"
                        display="block"
                        maxWidth="100%"
                      />
                    </Grid>
                    <Grid size={8} flex={1}>
                      <Typography
                        variant="h2"
                        fontSize="2rem"
                        fontWeight={700}
                        lineHeight={1}
                        color="primary.main"
                      >
                        02
                      </Typography>
                      <Typography
                        variant="h3"
                        fontSize="1.14rem"
                        fontWeight={700}
                        lineHeight={1}
                        color="primary.dark"
                        sx={{
                          marginBlock: { xs: ".75rem", md: ".8rem" },
                          cursor: "pointer",
                          "&:hover": { color: "primary.main" },
                        }}
                      >
                        Top 10 Laptops of 2022
                      </Typography>
                      <Typography
                        variant="body1"
                        fontSize="15px"
                        lineHeight={1.7}
                      >
                        Our best picks for various needs and budgets.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Grid container spacing={3}>
                    <Grid size={4}>
                      <Box
                        component="img"
                        src={gamingImage}
                        alt="Gaming Growth Image"
                        display="block"
                        maxWidth="100%"
                      />
                    </Grid>
                    <Grid size={8} flex={1}>
                      <Typography
                        variant="h2"
                        fontSize="2rem"
                        fontWeight={700}
                        lineHeight={1}
                        color="primary.main"
                      >
                        03
                      </Typography>
                      <Typography
                        variant="h3"
                        fontSize="1.14rem"
                        fontWeight={700}
                        lineHeight={1}
                        color="primary.dark"
                        sx={{
                          marginBlock: { xs: ".75rem", md: ".8rem" },
                          cursor: "pointer",
                          "&:hover": { color: "primary.main" },
                        }}
                      >
                        The Growth of Gaming
                      </Typography>
                      <Typography
                        variant="body1"
                        fontSize="15px"
                        lineHeight={1.7}
                      >
                        How the pandemic has sparked fresh opportunities.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
