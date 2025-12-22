import { Box, ToggleButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledToggleButton = styled(ToggleButton)(
  ({ theme, mode = "light" }) => {
    return {
      padding: "0.375rem 1.25rem",
      "&&&": {
        borderRadius: "1.5rem",
        margin: 0,
        border: "0.0625rem solid",
        borderColor: theme.palette.special.borderHover,
      },
      fontWeight: 400,
      fontSize: "1rem",
      textTransform: "none",
      backgroundColor:
        mode === "dark"
          ? theme.palette.background.paper
          : theme.palette.background.default,
      color: theme.palette.text.secondary,
      boxShadow:
        mode === "dark"
          ? "none"
          : "0 0.125rem 0.3125rem hsl(0deg 0% 78% / 33%)",
      "&&": {
        "&.Mui-selected": {
          backgroundColor:
            mode === "dark"
              ? theme.palette.primary.main
              : theme.palette.primary.dark,
          color: theme.palette.special.activeButton,
          fontSize: "1.125rem",
          fontWeight: 500,

          "&:not(:focus)": {
            borderColor: theme.palette.primary.main,
          },

          "&:hover": {
            backgroundColor:
              mode === "dark"
                ? theme.palette.primary.light
                : theme.palette.primary.dark,
            opacity: mode === "dark" ? 1 : 0.8,
          },
        },
      },

      "&&&:focus": {
        borderWidth: "0.125rem",
        borderColor: theme.palette.background.default,
        outline: "0.125rem solid",
        outlineColor: theme.palette.primary.main,
        "&:not(.Mui-selected)": {
          backgroundColor:
            mode === "dark"
              ? theme.palette.special.iconHover
              : theme.palette.background.default,
        },
      },

      "&:hover": {
        backgroundColor:
          mode === "dark"
            ? theme.palette.special.iconHover
            : theme.palette.background.default,
        opacity: mode === "dark" ? 1 : 0.65,
      },
    };
  }
);

export const RemoveBtnStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mode",
})(({ theme, mode = "dark" }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  backgroundColor: "transparent",
  outline: 0,
  border: "1px solid",
  margin: 0,
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  appearance: "none",
  textDecoration: "none",
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(14),
  lineHeight: 1.75,
  minWidth: 64,
  padding: "6px 16px",

  width: "5.6875rem",
  height: "2.375rem",
  borderRadius: "1.5rem",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  borderColor: theme.palette.special.borderHover,

  "&:hover": {
    backgroundColor:
      mode === "dark"
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
    color: theme.palette.special.activeButton,
    borderColor:
      mode === "dark"
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
  },

  "&:focus": {
    backgroundColor:
      mode === "dark"
        ? theme.palette.special.iconHover
        : theme.palette.background.paper,
    border: "0.125rem solid",
    borderColor: theme.palette.background.default,
    outline: "0.125rem solid",
    outlineColor: theme.palette.primary.main,

    "&:hover": {
      backgroundColor:
        mode === "dark"
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
      color: theme.palette.special.activeButton,
      borderColor:
        mode === "dark"
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
      outlineColor:
        mode === "dark"
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
    },
  },
}));
