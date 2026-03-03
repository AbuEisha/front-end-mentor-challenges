import { useState, useId } from "react";
import { Collapse, List, ListItem, Button, Box } from "@mui/material";
import ArrowUp from "./assets/images/icon-arrow-up.svg?react";
import ArrowDown from "./assets/images/icon-arrow-down.svg?react";
import TodoIcon from "./assets/images/icon-todo.svg?react";
import CalendarIcon from "./assets/images/icon-calendar.svg?react";
import RemindersIcon from "./assets/images/icon-reminders.svg?react";
import PlanningIcon from "./assets/images/icon-planning.svg?react";

export default function CustomDropdownList({ name, dropdownItems }) {
  const [open, setOpen] = useState(false);
  const collapseId = useId();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box position="relative">
      <Button
        onClick={handleClick}
        endIcon={open ? <ArrowUp /> : <ArrowDown />}
        disableRipple
        aria-expanded={open}
        aria-controls={collapseId}
        aria-haspopup="true"
        sx={{
          width: { xs: "100%", md: "auto" },
          paddingBlock: { xs: ".5rem", md: "6px" },
          paddingInline: { xs: "0", md: "1.25rem" },
          marginInlineStart: { md: ".25rem" },
          fontSize: "15px",
          textTransform: "none",
          justifyContent: "flex-start",
          color: "hsl(0, 0%, 41%)",
          "&:hover": {
            backgroundColor: "transparent",
            color: "hsl(0, 0%, 8%)",
          },
          "&.Mui-focusVisible": {
            backgroundColor: "transparent",
            color: "hsl(0, 0%, 8%)",
          },
          "& .MuiButton-icon": {
            marginLeft: { xs: "1rem", md: ".5rem" },
          },
        }}
      >
        {name}
      </Button>
      <Collapse
        id={collapseId}
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{
          position: { xs: "static", md: "absolute" },
          backgroundColor: { xs: "transparent", md: "white" },
          padding: { xs: "8px 0", md: "1rem 1.5rem" },
          boxShadow: {
            xs: "none",
            md: "10px 10px 20px hsl(0deg 0% 8% / 20%), -10px -10px 20px hsl(0deg 0% 8% / 10%)",
          },
          right:
            name === "Features"
              ? { xs: "auto", md: "18px" }
              : { xs: "auto", md: "-16px" },
          left: name === "Features" ? "auto" : { xs: "auto", md: "24px" },
          top: { xs: "auto", md: "48px" },
          borderRadius: { xs: 0, md: ".5rem" },
        }}
      >
        <List disablePadding>
          {dropdownItems.map((item) => (
            <ListItem key={item} disablePadding>
              <Button
                startIcon={
                  item === "Todo List" ? (
                    <TodoIcon />
                  ) : item === "Calendar" ? (
                    <CalendarIcon />
                  ) : item === "Reminders" ? (
                    <RemindersIcon />
                  ) : item === "Planning" ? (
                    <PlanningIcon />
                  ) : (
                    ""
                  )
                }
                fullWidth
                disableRipple
                sx={{
                  justifyContent: "flex-start",
                  paddingBlock: name === "Features" ? ".5rem 3px" : ".5rem",
                  paddingInlineStart: { xs: "1.67rem", md: "0" },
                  paddingInlineEnd: 0,
                  textTransform: "none",
                  fontSize: "15px",
                  lineHeight: "1",
                  color: "hsl(0, 0%, 41%)",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "hsl(0, 0%, 8%)",
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "transparent",
                    color: "hsl(0, 0%, 8%)",
                  },
                  "& .MuiButton-icon": {
                    marginBlockEnd: "4px",
                    marginInlineEnd: "1rem",
                    marginInlineStart: 0,
                  },
                }}
              >
                {item}
              </Button>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Box>
  );
}
