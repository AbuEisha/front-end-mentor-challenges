import { Box, Button, Dialog, IconButton, Grid } from "@mui/material";

import getImages from "../utils/imagesGlob";

import CloseIcon from "../assets/images/icon-close.svg?react";
import PreviousIcon from "../assets/images/icon-previous.svg?react";
import NextIcon from "../assets/images/icon-next.svg?react";

export default function ImagesDialog({
  open,
  handleClose,
  product,
  imageIndex,
  handlePreviousImg,
  handleNextImg,
  handleImageIndex,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="images-dialog-title"
      aria-describedby="images-dialog-description"
      role="alertdialog"
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "hsl(0deg 0% 0% / 75%)",
        },
        "& .MuiPaper-root": {
          width: "550px",
          backgroundColor: "transparent",
          boxShadow: "none",
          overflowY: "visible",
        },
      }}
    >
      <IconButton
        aria-label="Close Images Dialog"
        onClick={handleClose}
        sx={{
          padding: 0,
          marginInlineStart: "auto",
          marginBlockEnd: "1.5rem",
          width: "fit-content",
          "& path": { fill: "hsl(0, 0%, 100%)", transition: "fill .3s" },
          "&:hover": { "& path": { fill: "hsl(26, 100%, 55%)" } },
          "&.Mui-focusVisible": { "& path": { fill: "hsl(26, 100%, 55%)" } },
        }}
      >
        <CloseIcon />
      </IconButton>
      <Box position="relative">
        <IconButton
          aria-label="Previous Image"
          disableRipple
          onClick={handlePreviousImg}
          sx={{
            position: "absolute",
            width: "56px",
            height: "56px",
            backgroundColor: "hsl(0, 0%, 100%)",
            top: "50%",
            transform: "translateY(-50%)",
            left: "-28px",
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
          src={getImages(product.large_images[imageIndex])}
          alt={product.name}
          sx={{ display: "block", maxWidth: "100%", borderRadius: "1rem" }}
        />

        <IconButton
          aria-label="Next Image"
          disableRipple
          onClick={handleNextImg}
          sx={{
            position: "absolute",
            width: "56px",
            height: "56px",
            backgroundColor: "hsl(0, 0%, 100%)",
            top: "50%",
            transform: "translateY(-50%)",
            right: "-28px",
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
      <Grid container spacing="30px" marginBlockStart={5} paddingInline="54px">
        {product.thumbnails.map((thumb, index) => (
          <Grid key={index} size={3}>
            <Button
              aria-label={`Select Image ${index + 1}`}
              onClick={() => handleImageIndex(index)}
              fullWidth
              sx={{
                position: "relative",
                padding: 0,
                overflow: "hidden",
                borderRadius: ".75rem",
                outline: "2px solid transparent",
                outlineColor:
                  imageIndex === index ? "hsl(26, 100%, 55%)" : "transparent",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: ".5rem",
                  backgroundColor:
                    imageIndex === index
                      ? "hsl(0deg 0% 100% / 75%)"
                      : "transparent",
                  transition: "background .3s",
                },
                "&:hover": {
                  "&::before": {
                    backgroundColor:
                      imageIndex === index
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
    </Dialog>
  );
}
