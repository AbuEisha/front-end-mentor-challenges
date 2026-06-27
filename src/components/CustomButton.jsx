import { Button } from "@mui/material";

export default function CustomButton({ color }) {
  return (
    <Button
      sx={{
        width: "138px",
        height: "44px",
        borderRadius: "32px",
        backgroundColor: color,
        fontSize: "13px",
        fontWeight: 700,
        textTransform: "none",
        color: color === "white" ? "primary.main" : "background.paper",
        boxShadow:
          color === "white" ? "none" : "0px 6px 15px hsl(12deg 88% 59% / 50%)",
        transition: "all .3s ease",
        "&:hover": {
          opacity: color === "white" ? 1 : 0.65,
          boxShadow:
            color === "white"
              ? "none"
              : "0px 6px 15px hsl(12deg 88% 59% / 70%)",
          color: color === "white" && "hsl(12deg 88% 59% / 50%)",
        },
        "&.Mui-focusVisible": {
          opacity: color === "white" ? 1 : 0.65,
          boxShadow:
            color === "white"
              ? "none"
              : "0px 6px 15px hsl(12deg 88% 59% / 70%)",
        },
      }}
    >
      Get Started
    </Button>
  );
}
