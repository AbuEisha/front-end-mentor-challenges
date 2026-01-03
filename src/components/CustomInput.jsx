import { FormControl, Input, Typography } from "@mui/material";
import InfoIcon from "../assets/images/icon-info.svg?react";
export default function CustomInput({ info, value, handleChange, error }) {
  return (
    <FormControl fullWidth sx={{ marginBlockStart: "1.5rem" }}>
      <Typography component="label" htmlFor={info.name} marginBlockEnd=".5rem">
        {info.label}
      </Typography>
      <Input
        sx={{
          borderRadius: ".5rem",
          border: "0.0625rem solid",
          borderColor: error ? "hsl(7, 88%, 67%)" : "hsl(245, 15%, 58%)",
          overflow: "hidden",
          padding: ".66rem .75rem",
          backgroundColor: "hsl(245deg 19% 35% / 47%)",
          color: "hsl(0, 0%, 100%)",
          "&.Mui-focused": {
            outline: "0.125rem solid hsl(245, 15%, 58%)",
            outlineOffset: "0.125rem",
            boxShadow: "none",
            "&::after": {
              transform: "scaleX(0)",
            },
          },
          "&&::before": {
            borderBottom: "0",
          },

          "&:hover": {
            backgroundColor: "hsl(245deg 19% 35% / 80%)",
            "&&::before": {
              borderBottom: "0",
            },
          },
        }}
        value={value}
        onChange={(e) => handleChange(e, info.name)}
        id={info.name}
        name={info.name}
        placeholder={info.placeholder}
      />
      {error && (
        <Typography
          variant="body2"
          sx={{
            color: "hsl(7, 88%, 67%)",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            fontSize: ".65rem",
            marginBlockStart: ".75rem",
            "& .error": {
              stroke: "hsl(7, 88%, 67%)",
            },
          }}
        >
          <InfoIcon />
          {info.errorMsg}
        </Typography>
      )}
    </FormControl>
  );
}
