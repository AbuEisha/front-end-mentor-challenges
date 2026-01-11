import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import cartIcon from "../assets/images/icon-add-to-cart.svg";
import IncrementIcon from "../assets/images/icon-increment-quantity.svg?react";
import DecrementIcon from "../assets/images/icon-decrement-quantity.svg?react";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

export default function Product({
  product,
  images,
  handleClick,
  handleUpdate,
  findingProduct,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [quantity, setQuantity] = useState(1);
  const isFound = findingProduct(product.name);

  const handleAddingProduct = () => {
    handleClick(product);
    setQuantity(1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      handleUpdate(product.name, quantity - 1);
    }
  };
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    handleUpdate(product.name, quantity + 1);
  };
  return (
    <Stack>
      <Box marginBlockEnd="2.5rem" position="relative">
        {isMobile ? (
          <Box
            component="img"
            src={images[product.image.mobile]}
            alt={product.name}
            sx={{
              display: "block",
              maxWidth: "100%",
              border: isFound ? "3px solid" : "none",
              borderColor: isFound ? "primary.main" : "none",
              borderRadius: ".5rem",
            }}
          />
        ) : isTablet ? (
          <Box
            component="img"
            src={images[product.image.tablet]}
            alt={product.name}
            sx={{
              display: "block",
              maxWidth: "100%",
              border: isFound ? "3px solid" : "none",
              borderColor: isFound ? "primary.main" : "none",
              borderRadius: ".5rem",
            }}
          />
        ) : (
          <Box
            component="img"
            src={images[product.image.desktop]}
            alt={product.name}
            sx={{
              display: "block",
              maxWidth: "100%",
              border: isFound ? "3px solid" : "none",
              borderColor: isFound ? "primary.main" : "none",
              borderRadius: ".5rem",
            }}
          />
        )}

        <Box
          sx={{
            position: "absolute",
            width: "10.125rem",
            height: "2.75rem",
            left: "50%",
            bottom: "-1.3125rem",
            transform: "translateX(-50%)",
          }}
        >
          {isFound ? (
            <Box
              width="100%"
              height="100%"
              paddingInline="1rem"
              borderRadius="1.5rem"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                backgroundColor: "primary.main",
                color: "background.paper",
              }}
            >
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
                  borderColor: "background.paper",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  transition: "all .3s ease",
                  "&:hover": {
                    backgroundColor: "background.paper",
                    "& path": {
                      fill: "hsl(14, 86%, 42%)",
                    },
                  },
                  "&:focus-visible": {
                    outline: "none",
                  },
                }}
                onClick={handleDecreaseQuantity}
              >
                <DecrementIcon />
              </Box>
              <Typography
                variant="button"
                fontSize="1rem"
                fontWeight={600}
                lineHeight="1"
                textTransform="none"
              >
                {quantity}
              </Typography>
              <Box
                component="button"
                type="button"
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  paddingInline: "0",
                  border: "2px solid",
                  borderColor: "background.paper",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  transition: "all .3s ease",
                  "&:hover": {
                    backgroundColor: "background.paper",
                    "& path": {
                      fill: "hsl(14, 86%, 42%)",
                    },
                  },
                  "&:focus-visible": {
                    outline: "none",
                  },
                }}
                onClick={handleIncreaseQuantity}
              >
                <IncrementIcon />
              </Box>
            </Box>
          ) : (
            <Box
              component="button"
              type="button"
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap=".5rem"
              color="text.primary"
              sx={{
                cursor: "pointer",
                borderRadius: "24px",
                border: "1px solid",
                borderColor: "text.secondary",
                backgroundColor: "background.paper",
                transition: "all .3s ease",
                "&:hover": {
                  color: "primary.main",
                  borderColor: "primary.main",
                },
                "&:focus-visible": {
                  outline: "none",
                },
              }}
              onClick={handleAddingProduct}
            >
              <Box component="img" src={cartIcon} alt="Cart Icon" />
              <Typography
                variant="button"
                fontSize="1rem"
                fontWeight={600}
                lineHeight="1"
                textTransform="none"
              >
                Add to Cart
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Typography
        variant="body1"
        fontSize=".88rem"
        lineHeight="1.167"
        color="text.secondary"
      >
        {product.category}
      </Typography>
      <Typography
        variant="h2"
        fontWeight={600}
        color="text.primary"
        fontSize="1rem"
        marginBlock=".5rem"
      >
        {product.name}
      </Typography>
      <Typography
        variant="h3"
        fontSize="1rem"
        fontWeight={600}
        color="primary.main"
      >
        {`$${product.price.toFixed(2)}`}
      </Typography>
    </Stack>
  );
}
