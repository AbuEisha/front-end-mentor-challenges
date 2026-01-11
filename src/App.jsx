import "./App.css";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

import emptyCart from "./assets/images/illustration-empty-cart.svg";
import Product from "./components/Product";
import RemoveIcon from "./assets/images/icon-remove-item.svg?react";
import CarbonIcon from "./assets/images/icon-carbon-neutral.svg?react";

import productsData from "./assets/data/data.json";
import { useMemo, useState } from "react";
import ConfirmedModel from "./components/ConfirmedModel";
const images = import.meta.glob("./assets/images/*", {
  eager: true,
  query: "?url",
  import: "default",
});

export default function App() {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const cartSummary = useMemo(() => {
    return cart.reduce(
      (acc, product) => ({
        totalQuantities: acc.totalQuantities + product.quantity,
        totalPrices: acc.totalPrices + product.totalPrice,
      }),
      { totalQuantities: 0, totalPrices: 0 }
    );
  }, [cart]);

  const { totalQuantities, totalPrices } = cartSummary;

  const handleAddingToCart = (pro) => {
    const product = {
      productInfo: pro,
      quantity: 1,
      totalPrice: pro.price,
    };
    setCart((prev) => [...prev, product]);
  };

  const handleUpdatingProduct = (productName, quantity) => {
    setCart((prev) =>
      prev.map((product) => {
        if (product.productInfo.name === productName)
          return {
            ...product,
            quantity: quantity,
            totalPrice: quantity * product.productInfo.price,
          };
        else return product;
      })
    );
  };

  const findingProduct = (productName) => {
    return cart.find((product) => product.productInfo.name === productName);
  };

  const handleDeletingProduct = (productName) => {
    setCart((prev) =>
      prev.filter((product) => product.productInfo.name !== productName)
    );
  };

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const startNewOrder = () => {
    setCart([]);
    setOpen(false);
  };
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        paddingBlock: { xs: "1.5rem", sm: "5.1rem" },
        backgroundColor: "background.default",
      }}
    >
      <Container sx={{ maxWidth: { lg: "79.25rem" } }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7, lg: 7.98 }}>
            <Box component="section">
              <Typography
                variant="h1"
                fontSize="2.5rem"
                lineHeight={1}
                fontWeight={700}
                color="text.primary"
                marginBlockEnd="2.5rem"
              >
                Desserts
              </Typography>

              <Grid
                container
                rowSpacing={{ xs: 3, sm: 4 }}
                columnSpacing={2.75}
              >
                {productsData.map((product) => (
                  <Grid size={{ sm: 6, lg: 4 }} key={product.name}>
                    <Product
                      product={product}
                      images={images}
                      handleClick={handleAddingToCart}
                      handleUpdate={handleUpdatingProduct}
                      findingProduct={findingProduct}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 5, lg: 4.02 }}>
            <Box
              component="aside"
              sx={{
                backgroundColor: "background.paper",
                paddingInline: "1.5rem",
                paddingBlock: "1.9rem 1.5rem",
                borderRadius: ".75rem",
              }}
            >
              <Typography
                variant="h3"
                fontSize="1.5rem"
                fontWeight={700}
                lineHeight={1}
                color="primary.main"
              >{`Your Cart(${totalQuantities})`}</Typography>

              {cart.length ? (
                <Box marginBlockStart="1.5rem">
                  {cart.map((product) => (
                    <Stack
                      key={product.productInfo.name}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      paddingBlockEnd="1.75rem"
                      marginBlockEnd="1.75rem"
                      borderBottom="1px solid"
                      borderBottomColor="hsl(13, 31%, 94%)"
                    >
                      <Box>
                        <Typography
                          variant="h4"
                          fontWeight={600}
                          fontSize="1rem"
                          color="text.primary"
                          marginBlockEnd=".5rem"
                        >
                          {product.productInfo.name}
                        </Typography>
                        <Typography
                          variant="button"
                          fontSize="1rem"
                          fontWeight={600}
                          lineHeight="1"
                          textTransform="none"
                          color="primary.main"
                        >
                          {`${product.quantity}x`}
                        </Typography>
                        <Typography
                          variant="button"
                          fontSize="1rem"
                          lineHeight="1"
                          textTransform="none"
                          color="text.secondary"
                          marginInline=".9rem .65rem"
                        >
                          {`@  $${product.productInfo.price.toFixed(2)}`}
                        </Typography>
                        <Typography
                          variant="button"
                          fontSize="1rem"
                          fontWeight={600}
                          lineHeight="1"
                          textTransform="none"
                          color="text.secondary"
                        >
                          {`$${product.totalPrice.toFixed(2)}`}
                        </Typography>
                      </Box>
                      <Box
                        component="button"
                        type="button"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          width: "1.25rem",
                          height: "1.25rem",
                          borderRadius: "50%",
                          paddingInline: "0",
                          border: "2px solid",
                          borderColor: "hsl(14, 25%, 72%)",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          transition: "all .3s ease",
                          "&:hover": {
                            borderColor: "text.primary",
                            "& path": {
                              fill: "hsl(14, 65%, 9%)",
                            },
                          },
                          "&:focus-visible": {
                            outline: "none",
                          },
                        }}
                        onClick={() =>
                          handleDeletingProduct(product.productInfo.name)
                        }
                      >
                        <RemoveIcon />
                      </Box>
                    </Stack>
                  ))}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      lineHeight={1}
                      color="text.primary"
                    >
                      Order Total
                    </Typography>
                    <Typography
                      variant="h5"
                      fontSize="1.5rem"
                      fontWeight={700}
                      lineHeight={1}
                      color="text.primary"
                    >
                      {`$${totalPrices.toFixed(2)}`}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    gap=".75rem"
                    paddingBlock="1rem"
                    borderRadius=".5rem"
                    marginBlock="1.75rem 1.5rem"
                    sx={{ backgroundColor: "background.default" }}
                  >
                    <CarbonIcon />
                    <Typography variant="body1" color="text.primary">
                      This is a{" "}
                      <Typography
                        variant="body1"
                        component="span"
                        fontWeight={700}
                      >
                        carbon-neutral
                      </Typography>{" "}
                      delivery
                    </Typography>
                  </Stack>
                  <Box
                    component="button"
                    type="button"
                    sx={{
                      width: "100%",
                      height: "3.25rem",
                      borderRadius: "2rem",
                      backgroundColor: "primary.main",
                      border: "none",
                      color: "background.paper",
                      cursor: "pointer",
                      transition: "all .3s ease",
                      "&:hover": {
                        backgroundColor: "hsl(14deg 87.6% 35.76%)",
                      },
                      "&:focus-visible": {
                        outline: "none",
                      },
                    }}
                    onClick={handleOpenModal}
                  >
                    <Typography
                      variant="button"
                      textTransform="none"
                      fontWeight={600}
                    >
                      Confirm Order
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box textAlign="center" marginBlock="2.5rem .75rem">
                  <Box component="img" src={emptyCart} alt="Empty Cart icon" />
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    fontWeight={600}
                    marginBlockStart=".9rem"
                  >
                    Your added items will appear here
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <ConfirmedModel
        open={open}
        cart={cart}
        images={images}
        totalPrices={totalPrices}
        handleClose={handleCloseModal}
        startNewOrder={startNewOrder}
      />
    </Box>
  );
}
