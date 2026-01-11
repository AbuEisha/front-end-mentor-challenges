import { forwardRef } from "react";
import {
  Box,
  Stack,
  Dialog,
  DialogContent,
  Typography,
  Slide,
} from "@mui/material";
import confirmedIcon from "../assets/images/icon-order-confirmed.svg";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmedModel({
  open,
  cart,
  images,
  totalPrices,
  handleClose,
  startNewOrder,
}) {
  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        "& .MuiPaper-root": {
          width: "37rem",
          maxWidth: "37rem",
          padding: { xs: "1.5rem", sm: "2.5rem" },
          margin: 0,
          borderRadius: ".75rem",
          boxShadow: "none",
        },
      }}
    >
      <Box
        component="img"
        src={confirmedIcon}
        alt="Confirmed Icon"
        maxWidth="48px"
      />
      <Typography
        variant="h2"
        fontSize="2.5rem"
        fontWeight={700}
        lineHeight={1}
        sx={{ padding: 0, marginBlock: "1.75rem 1rem" }}
      >
        {"Order Confirmed"}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        id="alert-dialog-slide-description"
      >
        {"We hope you enjoy your food!"}
      </Typography>
      <DialogContent
        sx={{
          backgroundColor: "background.default",
          padding: "1.5rem",
          marginBlockStart: "2rem",
        }}
      >
        {cart.map((product) => (
          <Stack
            key={product.productInfo.name}
            direction="row"
            alignItems="center"
            gap="1rem"
            paddingBlockEnd="1.25rem"
            marginBlockEnd="1.25rem"
            borderBottom="1px solid"
            borderBottomColor="hsl(14deg 25% 72% / 20%)"
          >
            <Box
              component="img"
              src={images[product.productInfo.image.thumbnail]}
              alt={product.productInfo.name}
              maxWidth="48px"
              borderRadius=".25rem"
            />
            <Box>
              <Typography
                variant="h3"
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
                marginInline="1rem .75rem"
              >
                {`@  $${product.productInfo.price.toFixed(2)}`}
              </Typography>
            </Box>
            <Typography
              variant="button"
              fontSize="1rem"
              fontWeight={600}
              lineHeight="1"
              textTransform="none"
              color="text.primary"
              marginInlineStart="auto"
            >
              {`$${product.totalPrice.toFixed(2)}`}
            </Typography>
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
            variant="h4"
            fontSize="1.5rem"
            fontWeight={700}
            lineHeight={1}
            color="text.primary"
          >
            {`$${totalPrices.toFixed(2)}`}
          </Typography>
        </Stack>
      </DialogContent>
      <Box
        component="button"
        type="button"
        sx={{
          width: "100%",
          height: "3.25rem",
          borderRadius: "2rem",
          marginBlockStart: "2rem",
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
        onClick={startNewOrder}
      >
        <Typography
          variant="button"
          textTransform="none"
          fontSize="1rem"
          fontWeight={600}
        >
          Start New Order
        </Typography>
      </Box>
    </Dialog>
  );
}
