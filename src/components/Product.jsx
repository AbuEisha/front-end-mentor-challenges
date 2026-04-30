import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

import getImages from "../utils/imagesGlob";

import MinusIcon from "../assets/images/icon-minus.svg?react";
import PlusIcon from "../assets/images/icon-plus.svg?react";
import CartIcon from "../assets/images/icon-cart.svg?react";
import PreviousIcon from "../assets/images/icon-previous.svg?react";
import NextIcon from "../assets/images/icon-next.svg?react";

import ImagesDialog from "./ImagesDialog";

export default function Product({ product, handleAddToCart }) {
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [choosingImg, setChoosingImg] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecreaseQuantity = () => {
    if (quantity === 0) return;
    setQuantity((prev) => prev - 1);
  };

  const handleAddProduct = () => {
    handleAddToCart(product, quantity);
    setQuantity(0);
  };

  const getDiscountedPrice = (product) =>
    product.price - (product.price * product.discount) / 100;

  const handlePreviousImg = () => {
    setChoosingImg(
      (prev) =>
        (prev - 1 + product.large_images.length) % product.large_images.length,
    );
  };
  const handleNextImg = () => {
    setChoosingImg((prev) => (prev + 1) % product.large_images.length);
  };
  const handleChoosingImg = (index) => {
    setChoosingImg(index);
  };

  const handleOpen = () => {
    setOpenImageDialog(true);
  };
  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid size={{ xs: 12, sm: 5.5, md: 5.25 }}>
          <Box position="relative" display={{ xs: "block", sm: "none" }}>
            <IconButton
              disableRipple
              onClick={handlePreviousImg}
              sx={{
                position: "absolute",
                width: "40px",
                height: "40px",
                backgroundColor: "hsl(0, 0%, 100%)",
                top: "50%",
                transform: "translateY(-50%)",
                left: "1rem",
                "& path": { transition: "stroke .3s" },
                "&:hover": { "& path": { stroke: "hsl(26, 100%, 55%)" } },
                "&.Mui-focusVisible": {
                  "& path": { stroke: "hsl(26, 100%, 55%)" },
                },
              }}
            >
              <PreviousIcon />
            </IconButton>
            <Box
              component="img"
              src={getImages(product.large_images[choosingImg])}
              alt={product.name}
              sx={{ display: "block", maxWidth: "100%" }}
            />

            <IconButton
              disableRipple
              onClick={handleNextImg}
              sx={{
                position: "absolute",
                width: "40px",
                height: "40px",
                backgroundColor: "hsl(0, 0%, 100%)",
                top: "50%",
                transform: "translateY(-50%)",
                right: "1rem",
                "& path": { transition: "stroke .3s" },
                "&:hover": { "& path": { stroke: "hsl(26, 100%, 55%)" } },
                "&.Mui-focusVisible": {
                  "& path": { stroke: "hsl(26, 100%, 55%)" },
                },
              }}
            >
              <NextIcon />
            </IconButton>
          </Box>
          <Button
            onClick={() => handleOpen(product)}
            fullWidth
            sx={{
              display: { xs: "none", sm: "flex" },
              padding: 0,
              overflow: "hidden",
              borderRadius: "1rem",
            }}
          >
            <Box
              component="img"
              src={getImages(product.large_images[choosingImg])}
              alt={product.name}
              sx={{ display: "block", maxWidth: "100%" }}
            />
          </Button>
          <Grid
            container
            spacing="30px"
            marginBlockStart={4}
            display={{ xs: "none", md: "flex" }}
          >
            {product.thumbnails.map((thumb, index) => (
              <Grid key={index} size={3}>
                <Button
                  onClick={() => handleChoosingImg(index)}
                  fullWidth
                  sx={{
                    position: "relative",
                    padding: 0,
                    overflow: "hidden",
                    borderRadius: ".75rem",
                    outline: "2px solid transparent",
                    outlineColor:
                      choosingImg === index
                        ? "hsl(26, 100%, 55%)"
                        : "transparent",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      borderRadius: ".5rem",
                      backgroundColor:
                        choosingImg === index
                          ? "hsl(0deg 0% 100% / 75%)"
                          : "transparent",
                      transition: "background .3s",
                    },
                    "&:hover": {
                      "&::before": {
                        backgroundColor:
                          choosingImg === index
                            ? "hsl(0deg 0% 100% / 75%)"
                            : "hsl(0deg 0% 100% / 55%)",
                      },
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={getImages(thumb)}
                    alt={product.name}
                    sx={{
                      display: "block",
                      maxWidth: "100%",
                    }}
                  />
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 5.5, md: 5.25 }}
          padding={{ xs: "1.5rem 1.5rem 0", sm: 0 }}
        >
          <Typography
            variant="body1"
            fontSize="13px"
            fontWeight={700}
            color="hsl(219, 9%, 45%)"
            textTransform="uppercase"
            letterSpacing="2px"
          >
            {product.company}
          </Typography>
          <Typography
            variant="h1"
            fontSize={{ xs: "1.9rem", md: "2.75rem" }}
            fontWeight={700}
            color="hsl(220, 13%, 13%)"
            marginBlockStart={2}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body1"
            fontSize={{ xs: "15.2px", md: "1rem" }}
            color="hsl(219, 9%, 45%)"
            marginBlock={{ xs: "1.25rem 2rem", sm: "2rem 1.25rem" }}
          >
            {product.description}
          </Typography>
          <Stack
            flexDirection={{ xs: "row", md: "column" }}
            alignItems={{ xs: "center", md: "flex-start" }}
            justifyContent="space-between"
            rowGap={1.5}
            marginBlockEnd={{ xs: 3.5, sm: 4 }}
          >
            <Stack flexDirection="row" alignItems="center" gap={2}>
              <Typography
                variant="h2"
                fontSize="1.85rem"
                fontWeight={700}
                color="hsl(220, 13%, 13%)"
              >{`$${getDiscountedPrice(product).toFixed(2)}`}</Typography>
              <Typography
                variant="body1"
                fontSize="14px"
                fontWeight={700}
                color="hsl(0, 0%, 100%)"
                width="52px"
                height="28px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="6px"
                sx={{ backgroundColor: "hsl(220, 13%, 13%)" }}
              >{`${product.discount}%`}</Typography>
            </Stack>
            <Typography
              variant="h3"
              fontSize="1rem"
              fontWeight={700}
              color="hsl(219, 9%, 45%)"
              sx={{ textDecoration: "line-through" }}
            >{`$${product.price.toFixed(2)}`}</Typography>
          </Stack>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4.5 }}>
              <Stack
                flexDirection="row"
                sx={{
                  backgroundColor: "hsl(223, 64%, 98%)",
                  height: "56px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: "8px",
                }}
              >
                <IconButton
                  disableRipple
                  onClick={handleDecreaseQuantity}
                  sx={{
                    height: "100%",
                    width: "36px",
                    borderRadius: 0,
                    "&:hover": {
                      backgroundColor: "transparent",
                      opacity: 0.6,
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: "transparent",
                      opacity: 0.6,
                    },
                  }}
                >
                  <MinusIcon />
                </IconButton>
                <Typography variant="body1" fontWeight={700}>
                  {quantity}
                </Typography>
                <IconButton
                  disableRipple
                  onClick={handleIncreaseQuantity}
                  sx={{
                    height: "100%",
                    width: "36px",
                    borderRadius: 0,
                    "&:hover": { backgroundColor: "transparent", opacity: 0.6 },
                    "&.Mui-focusVisible": {
                      backgroundColor: "transparent",
                      opacity: 0.6,
                    },
                  }}
                >
                  <PlusIcon />
                </IconButton>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 7.5 }}>
              <Button
                onClick={handleAddProduct}
                variant="contained"
                startIcon={<CartIcon />}
                fullWidth
                sx={{
                  height: "56px",
                  backgroundColor: "hsl(26, 100%, 55%)",
                  color: "hsl(220, 13%, 13%)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: ".5rem",
                  gap: ".5rem",
                  boxShadow: "none",
                  "& path": { fill: "hsl(220, 13%, 13%)" },
                  "&:hover": {
                    backgroundColor: "hsl(26deg 100% 55% / 65%)",
                    boxShadow: "none",
                  },
                }}
              >
                Add to cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ImagesDialog
        open={openImageDialog}
        handleClose={handleCloseImageDialog}
        product={product}
        imageIndex={choosingImg}
        handlePreviousImg={handlePreviousImg}
        handleNextImg={handleNextImg}
        handleImageIndex={handleChoosingImg}
      />
    </>
  );
}
