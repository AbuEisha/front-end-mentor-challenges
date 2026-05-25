import { Box, IconButton, Stack, Typography } from "@mui/material";

import CheckIcon from "./assets/images/icon-check.svg?react";
import CrossIcon from "./assets/images/icon-cross.svg?react";

export default function Todo({
  todo,
  handleUpdate,
  handleDelete,
  draggable,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  return (
    <Stack
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      flexDirection="row"
      alignItems="center"
      padding={{ xs: "1rem 1.25rem .75rem", sm: "1.25rem 1.5rem 1rem" }}
      borderBottom="1px solid"
      borderColor="secondary.main"
      sx={{
        cursor: "pointer",
        "&:hover": {
          "& .delete-btn": {
            display: "inline-flex",
          },
        },
      }}
    >
      <Box
        sx={{
          width: { xs: 20, sm: 24 },
          height: { xs: 20, sm: 24 },
          padding: "1px",
          borderRadius: "50%",
          backgroundColor: "secondary.main",
          backgroundImage: todo.status
            ? "linear-gradient(130deg, hsl(192, 99%, 67%) 15%, hsl(280, 87%, 65%) 90%)"
            : "none",
          marginBlockEnd: "4px",
          transition: "all .3s",
          "&:hover": {
            backgroundImage:
              "linear-gradient(130deg, hsl(192, 99%, 67%) 15%, hsl(280, 87%, 65%) 90%)",
          },
        }}
      >
        <IconButton
          disableRipple
          aria-label="Change Task Status"
          sx={{
            verticalAlign: "baseline",
            padding: 0,
            width: "100%",
            height: "100%",
            backgroundColor: todo.status ? "transparent" : "background.paper",
          }}
          onClick={() => handleUpdate(todo.id)}
        >
          {todo.status && <CheckIcon />}
        </IconButton>
      </Box>
      <Typography
        variant="h2"
        fontSize={{ xs: "12px", sm: "18px" }}
        fontWeight={400}
        color={todo.status ? "action.selected" : "text.primary"}
        marginInlineStart={{ xs: 1.5, sm: 3 }}
        flex={1}
        sx={{ textDecoration: todo.status ? "line-through" : "none" }}
      >
        {todo.title}
      </Typography>
      <IconButton
        disableRipple
        className="delete-btn"
        aria-label="Delete Task"
        sx={{ display: { xs: "inline-flex", sm: "none" }, padding: 0 }}
        onClick={() => handleDelete(todo.id)}
      >
        <CrossIcon />
      </IconButton>
    </Stack>
  );
}
