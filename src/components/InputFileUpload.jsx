import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

import InfoIcon from "../assets/images/icon-info.svg?react";
import uploadIcon from "../assets/images/icon-upload.svg";
import { useEffect, useRef, useState } from "react";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload({
  imageFile,
  handleChange,
  handleDrop,
  handleDelete,
  error,
}) {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const createUrl = () => {
      if (!imageFile) {
        setImageUrl(null);
        return;
      }

      const url = URL.createObjectURL(imageFile);
      setImageUrl(url);

      return () => URL.revokeObjectURL(url);
    };
    createUrl();
  }, [imageFile]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggedOver(true);
  };

  const handleDropImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggedOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleDrop(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    handleDelete();
  };

  const handleChangeImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current.click();
  };
  return (
    <>
      <Box
        component={imageFile ? "div" : "label"}
        role={undefined}
        tabIndex={-1}
        sx={{
          background: isDraggedOver
            ? "hsl(245deg 19% 35% / 80%)"
            : "hsl(245deg 19% 35% / 47%)",
          color: "hsl(252, 6%, 83%)",
          boxShadow: "none",
          textAlign: "center",
          fontSize: "1rem",
          height: "8rem",
          borderRadius: "1rem",
          border: "0.125rem dashed hsl(245, 15%, 58%)",
          textTransform: "none",
          cursor: imageFile ? "default" : "pointer",
          "&:has(:focus)": {
            outline: "0.125rem solid hsl(245, 15%, 58%)",
            outlineOffset: "0.125rem",
            boxShadow: "none",
          },
          "&:hover": {
            backgroundColor: imageFile
              ? "hsl(245deg 19% 35% / 47%)"
              : "hsl(245deg 19% 35% / 80%)",
            "& .css-1j6xrkj": {
              backgroundColor: imageFile
                ? "hsl(245deg 19% 35% / 47%)"
                : "hsl(245deg 19% 35% / 80%)",
              borderColor: "hsl(245, 15%, 58%)",
            },
          },
        }}
      >
        <Box
          component="span"
          sx={{ width: "100%", height: "100%", paddingBlock: "1rem" }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          onDragOver={handleDragOver}
          onDrop={handleDropImage}
        >
          <Box
            component="span"
            sx={{
              display: "flex",
              width: "3.125rem",
              height: "3.125rem",
              borderRadius: ".75rem",
              alignItems: "center",
              justifyContent: "center",
              marginInline: "auto",
              backgroundColor: "hsl(245deg 19% 35% / 59%)",
              border: "0.0625rem solid",
              borderColor: imageFile
                ? "hsl(245, 15%, 58%)"
                : "hsl(245, 19%, 35%)",
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              sx={{
                width: imageFile ? "100%" : "auto",
                height: imageFile ? "100%" : "auto",
                objectFit: imageFile ? "cover" : "none",
              }}
              src={imageFile ? imageUrl : uploadIcon}
              alt={imageFile ? "Preview of uploaded image" : "Upload icon"}
            />
          </Box>

          {!imageFile && (
            <Typography component="span" variant="body1">
              Drag and drop or click to upload
            </Typography>
          )}

          {imageFile && (
            <Box
              component="span"
              display="flex"
              justifyContent="center"
              gap=".75rem"
            >
              <Button
                type="button"
                disableRipple
                sx={{
                  backgroundColor: "hsl(245deg 19% 35% / 59%)",
                  color: "hsl(0, 0%, 100%)",
                  textTransform: "none",
                  padding: "0rem .5rem",
                  height: "1.5rem",
                  "&:hover": {
                    color: "hsl(252, 6%, 83%)",
                    textDecoration: "underLine",
                  },
                  "&:focus": {
                    color: "hsl(252, 6%, 83%)",
                    textDecoration: "underLine",
                  },
                }}
                onClick={handleRemoveImage}
              >
                Remove image
              </Button>
              <Button
                type="button"
                disableRipple
                sx={{
                  backgroundColor: "hsl(245deg 19% 35% / 59%)",
                  color: "hsl(0, 0%, 100%)",
                  textTransform: "none",
                  padding: "0rem .5rem",
                  height: "1.5rem",
                  "&:hover": {
                    color: "hsl(252, 6%, 83%)",
                    textDecoration: "underLine",
                  },
                  "&:focus": {
                    color: "hsl(252, 6%, 83%)",
                    textDecoration: "underLine",
                  },
                }}
                onClick={handleChangeImage}
              >
                Change image
              </Button>
            </Box>
          )}
        </Box>
        <VisuallyHiddenInput
          id="upload-image"
          name="imageUploaded"
          ref={fileInputRef}
          type="file"
          onChange={(e) => handleChange(e, "imageFile")}
          accept=".jpg, .png"
        />
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: error ? "hsl(7, 88%, 67%)" : "hsl(252, 6%, 83%)",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          fontSize: ".65rem",
          marginBlockStart: ".75rem",
          "& .error": {
            stroke: error ? "hsl(7, 88%, 67%)" : "hsl(252, 6%, 83%)",
          },
        }}
      >
        <InfoIcon />
        {error
          ? "File too large. Please upload a photo under 500KB."
          : "Upload your photo (JPG or PNG, max size: 500KB)."}
      </Typography>
    </>
  );
}
