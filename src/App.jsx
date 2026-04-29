import { useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Badge,
  badgeClasses,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
  Button,
  Container,
  Stack,
  styled,
  ClickAwayListener,
} from "@mui/material";

import "./App.css";

import Logo from "./assets/images/logo.svg?react";
import MenuIcon from "./assets/images/icon-menu.svg?react";
import CartIcon from "./assets/images/icon-cart.svg?react";
import DeleteIcon from "./assets/images/icon-delete.svg?react";
import CloseIcon from "./assets/images/icon-close.svg?react";
import avatarImg from "./assets/images/image-avatar.png";

import products from "./assets/products.json";
import Product from "./Product";

const drawerWidth = 250;
const navItems = ["Collections", "Men", "Women", "About", "Contact"];

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    background-color: hsl(26, 100%, 55%);
    color: hsl(0, 0%, 100%);
    height: 14px;
    font-size: 10px;
    font-weight: 700;
    top: -10px;
    right: 3px;
  }
`;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);

  const cartQuantity = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart],
  );

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleCartToggle = () => {
    setOpenCart((prev) => !prev);
  };

  const handleAddToCart = (product, quantity) => {
    if (quantity === 0) return;
    const productPrice =
      product.price - (product.price * product.discount) / 100;

    const added = {
      id: product.id,
      imgUrl: product.thumbnails[0],
      name: product.name,
      quantity: quantity,
      price: productPrice,
      totalPrice: quantity * productPrice,
    };

    setCart((prev) => {
      const existingProductIndex = prev.findIndex(
        (item) => item.id === product.id,
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prev];
        const existing = updatedCart[existingProductIndex];
        const newQuantity = existing.quantity + quantity;
        updatedCart[existingProductIndex] = {
          ...existing,
          quantity: newQuantity,
          totalPrice: newQuantity * productPrice,
        };
        return updatedCart;
      } else return [...prev, added];
    });
  };

  const handleDeleteProduct = (productId) => {
    setCart((prev) => prev.filter((product) => product.id !== productId));
  };

  const drawer = (
    <Box sx={{ padding: "1rem 1.5rem" }}>
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          padding: 0,
          "& path": { transition: "fill .3s" },
          "&:hover": { "& path": { fill: "hsl(26, 100%, 55%)" } },
          "&.Mui-focusVisible": { "& path": { fill: "hsl(26, 100%, 55%)" } },
        }}
      >
        <CloseIcon />
      </IconButton>
      <List sx={{ paddingBlock: "2.5rem" }}>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <Button
              disableRipple
              sx={{
                width: "100%",
                justifyContent: "flex-start",
                minWidth: "auto",
                paddingInline: 0,
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "hsl(220, 13%, 13%)",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "hsl(26, 100%, 55%)",
                },
                "&.Mui-focusVisible": {
                  backgroundColor: "transparent",
                  color: "hsl(26, 100%, 55%)",
                },
              }}
            >
              {item}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container
        sx={{ maxWidth: { lg: "1112px" }, "&&": { paddingInline: 0 } }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CssBaseline />
          <AppBar
            component="nav"
            sx={{
              position: "sticky",
              backgroundColor: "transparent",
              color: "hsl(219, 9%, 45%)",
              boxShadow: "none",
              paddingInline: { xs: 3, lg: 0 },
            }}
          >
            <Toolbar
              sx={{
                "&&": {
                  paddingInline: 0,
                  height: { xs: 66, sm: 111 },
                },
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, ml: 0, p: 0, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Stack
                flex={1}
                flexDirection="row"
                alignItems="center"
                gap={7}
                sx={{ height: { xs: "auto", sm: 111 } }}
              >
                <Logo />
                <List
                  sx={{
                    display: { xs: "none", md: "flex" },
                    paddingBlock: 0,
                    height: "100%",
                    gap: "2rem",
                  }}
                >
                  {navItems.map((item) => (
                    <ListItem key={item} sx={{ padding: 0 }}>
                      <Button
                        disableRipple
                        sx={{
                          height: "100%",
                          minWidth: "auto",
                          padding: 0,
                          fontWeight: 400,
                          fontSize: "15px",
                          color: "hsl(219, 9%, 45%)",
                          textTransform: "none",
                          "&::before": {
                            position: "absolute",
                            content: '""',
                            width: "0",
                            height: "5px",
                            backgroundColor: "hsl(26, 100%, 55%)",
                            left: "0",
                            bottom: 0,
                            transition: "width .3s",
                          },
                          "&:hover": {
                            backgroundColor: "transparent",
                            color: "hsl(220, 13%, 13%)",
                            "&::before": {
                              width: "100%",
                            },
                          },
                          "&.Mui-focusVisible": {
                            backgroundColor: "transparent",
                            color: "hsl(220, 13%, 13%)",
                            "&::before": {
                              width: "100%",
                            },
                          },
                        }}
                      >
                        {item}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </Stack>
              <Stack
                flexDirection="row"
                alignItems="center"
                gap={{ xs: 3, md: 5.5 }}
              >
                <Box position={{ xs: "static", lg: "relative" }}>
                  <IconButton
                    onClick={handleCartToggle}
                    disableRipple
                    sx={{
                      padding: 0,
                      "& path": { transition: "fill .3s" },
                      "&:hover": {
                        backgroundColor: "transparent",
                        "& path": { fill: "hsl(220, 13%, 13%)" },
                      },
                      "&.Mui-focusVisible": {
                        backgroundColor: "transparent",
                        "& path": { fill: "hsl(220, 13%, 13%)" },
                      },
                    }}
                  >
                    <CartIcon />
                    {cartQuantity > 0 && (
                      <CartBadge
                        badgeContent={cartQuantity}
                        overlap="rectangular"
                      />
                    )}
                  </IconButton>
                  {openCart && (
                    <ClickAwayListener onClickAway={handleCartToggle}>
                      <Box
                        sx={{
                          position: "absolute",
                          width: { xs: "calc(100% + 32px)", md: "360px" },
                          backgroundColor: "hsl(0, 0%, 100%)",
                          borderRadius: ".75rem",
                          top: { xs: "75px", md: "89px", lg: "46px" },
                          left: { xs: -16, md: "auto", lg: "50%" },
                          right: { xs: 0, lg: "auto" },
                          transform: { lg: "translateX(-50%)" },
                          boxShadow:
                            "4px 10px 10px hsl(220deg 13% 13% / 15%), -4px 10px 10px hsl(220deg 13% 13% / 10%)",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            padding: "1.75rem 1.5rem",
                            fontWeight: 700,
                            color: "hsl(220, 13%, 13%)",
                          }}
                        >
                          Cart
                        </Typography>
                        <Divider />
                        <Box
                          sx={{
                            height: "190px",
                            display: "flex",
                            alignItems: cart.length ? "normal" : "center",
                            justifyContent: cart.length
                              ? "flex-start"
                              : "center",
                            padding: "1.5rem",
                          }}
                        >
                          {cart.length ? (
                            <Box sx={{ width: "100%" }}>
                              {cart.map((pro) => (
                                <Stack
                                  key={pro.id}
                                  flexDirection="row"
                                  alignItems="center"
                                  justifyContent="space-between"
                                  marginBlockEnd="1.5rem"
                                >
                                  <Box
                                    component="img"
                                    src={
                                      new URL(pro.imgUrl, import.meta.url).href
                                    }
                                    alt={pro.name}
                                    sx={{
                                      width: "50px",
                                      borderRadius: ".25rem",
                                    }}
                                  />
                                  <Box>
                                    <Typography variant="body1">
                                      {pro.name}
                                    </Typography>
                                    <Stack flexDirection="row" gap="6px">
                                      <Typography variant="body1">
                                        {`$${pro.price.toFixed(2)} x ${pro.quantity}`}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        fontWeight={700}
                                        color="hsl(220, 13%, 13%)"
                                      >{`$${pro.totalPrice.toFixed(2)}`}</Typography>
                                    </Stack>
                                  </Box>
                                  <IconButton
                                    disableRipple
                                    onClick={() => handleDeleteProduct(pro.id)}
                                    sx={{
                                      padding: 0,
                                      "& use": {
                                        transition: "fill .3s",
                                      },
                                      "&:hover": {
                                        backgroundColor: "transparent",
                                        "& use": {
                                          fill: "hsl(26, 100%, 55%)",
                                        },
                                      },
                                      "&.Mui-focusVisible": {
                                        backgroundColor: "transparent",
                                        "& use": {
                                          fill: "hsl(26, 100%, 55%)",
                                        },
                                      },
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Stack>
                              ))}
                              <Button
                                disableRipple
                                sx={{
                                  width: "100%",
                                  height: "56px",
                                  backgroundColor: "hsl(26, 100%, 55%)",
                                  color: "hsl(220, 13%, 13%)",
                                  fontSize: "1rem",
                                  fontWeight: 700,
                                  textTransform: "none",
                                  borderRadius: ".5rem",
                                  "&:hover": {
                                    backgroundColor:
                                      "hsl(26deg 100% 55% / 65%)",
                                  },
                                  "&.Mui-focusVisible": {
                                    backgroundColor:
                                      "hsl(26deg 100% 55% / 65%)",
                                  },
                                }}
                              >
                                Checkout
                              </Button>
                            </Box>
                          ) : (
                            <Typography
                              variant="body1"
                              fontWeight={700}
                              color="hsl(219, 9%, 45%)"
                            >
                              Your cart is empty
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </ClickAwayListener>
                  )}
                </Box>
                <Button
                  disableRipple
                  sx={{
                    minWidth: { xs: 28, md: 54 },
                    maxWidth: { xs: 28, md: 54 },
                    height: { xs: 28, md: 54 },
                    borderRadius: "50%",
                    border: "2px solid transparent",
                    padding: 0,
                    "&:hover": {
                      borderColor: "hsl(26, 100%, 55%)",
                    },
                    "&.Mui-focusVisible": {
                      borderColor: "hsl(26, 100%, 55%)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={avatarImg}
                    alt="Avatar Image"
                    sx={{ display: "block", maxWidth: "100%" }}
                  />
                </Button>
              </Stack>
            </Toolbar>
            <Divider />
          </AppBar>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Box
            component="main"
            sx={{ padding: { sm: "4rem 1.5rem", md: "5.625rem 3rem" } }}
          >
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
