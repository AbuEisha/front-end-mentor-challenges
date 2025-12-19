import { Stack, Typography, Button, Switch, Box } from "@mui/material";

export default function ExtensionCard({
  mode,
  extension,
  imgSrc,
  handleChange,
  handleOpen,
}) {
  // Styles
  const articleStyle = {
    minHeight: "12.5rem",
    backgroundColor: "background.default",
    padding: "1.25rem",
    borderRadius: "1rem",
    border: "0.0625rem solid",
    borderColor: "special.borderHover",
    boxShadow:
      mode === "dark" ? "none" : "0 0.125rem 0.3125rem hsl(0deg 0% 78% / 33%)",
  };

  const removeBtnStyle = {
    width: "5.6875rem",
    height: "2.375rem",
    borderRadius: "1.5rem",
    textTransform: "Capitalize",
    color: "text.secondary",
    borderColor: "special.borderHover",
    "&:hover": {
      backgroundColor: mode === "dark" ? "primary.light" : "primary.dark",
      color: "special.activeButton",
      borderColor: mode === "dark" ? "primary.light" : "primary.dark",
    },

    "&:focus": {
      backgroundColor:
        mode === "dark" ? "special.iconHover" : "background.paper",
      border: "0.125rem solid",
      borderColor: "background.default",
      outline: "0.125rem solid",
      outlineColor: "primary.main",
      "&:hover": {
        backgroundColor: mode === "dark" ? "primary.light" : "primary.dark",
        color: "special.activeButton",
        borderColor: mode === "dark" ? "primary.light" : "primary.dark",
        outlineColor: mode === "dark" ? "primary.light" : "primary.dark",
      },
    },
  };

  const switchBtnStyle = {
    width: "2.25rem",
    height: "1.375rem",
    padding: 0,
    border: "0.125rem solid transparent",
    outline: "0.125rem solid transparent",
    borderRadius: "0.6875rem",
    "&:has(:focus)": {
      borderColor: "background.default",
      outlineColor: "primary.main",
    },
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: "0.875rem",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: "1.125rem",
      top: "-1rem",
      left: "-1rem",
      "&.Mui-checked": {
        transform: "translateX(0.875rem)",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "primary.dark",
          ...(mode === "dark" && {
            backgroundColor: "primary.main",
          }),
        },
        "&:hover + .MuiSwitch-track": {
          backgroundColor: "primary.light",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      width: "0.875rem",
      height: "0.875rem",
      borderRadius: "0.4375rem",
      color: "#fff",
    },
    "& .MuiSwitch-track": {
      borderRadius: "0.6875rem",
      opacity: mode === "dark" ? 1 : 0.35,
      backgroundColor: "hsl(226, 11%, 37%)",
    },
  };

  return (
    <Stack component="article" sx={articleStyle} justifyContent="space-between">
      <Stack gap={2} flexDirection="row" alignItems="flex-start">
        <img src={imgSrc} alt={extension.name} />
        <Box>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              lineHeight: 1.3,
              fontSize: "1.25rem",
              color: "text.secondary",
            }}
          >
            {extension.name}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              color: "text.third",
              lineHeight: 1.6,
              marginTop: "0.5rem",
              fontSize: { xs: ".90rem", sm: ".84rem" },
            }}
          >
            {extension.description}
          </Typography>
        </Box>
      </Stack>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          variant="outlined"
          sx={removeBtnStyle}
          onClick={() => handleOpen(extension.name)}
        >
          Remove
        </Button>
        <Switch
          checked={extension.isActive}
          onChange={() => handleChange(extension.name)}
          slotProps={{ input: { "aria-label": "controlled" } }}
          sx={switchBtnStyle}
        />
      </Stack>
    </Stack>
  );
}
