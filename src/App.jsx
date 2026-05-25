import { useEffect, useMemo, useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";

import SunIcon from "./assets/images/icon-sun.svg?react";
import MoonIcon from "./assets/images/icon-moon.svg?react";
import CheckIcon from "./assets/images/icon-check.svg?react";

import bgMobileDark from "./assets/images/bg-mobile-dark.jpg";
import bgMobileLight from "./assets/images/bg-mobile-light.jpg";
import bgDesktopDark from "./assets/images/bg-desktop-dark.jpg";
import bgDesktopLight from "./assets/images/bg-desktop-light.jpg";
import Todo from "./Todo";

const initialTasks = [
  {
    id: crypto.randomUUID(),
    title: "Complete online JavaScript course",
    status: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Jog around the park 3x",
    status: false,
  },
  {
    id: crypto.randomUUID(),
    title: "10 minutes meditation",
    status: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Read for 1 hour",
    status: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Pick up groceries",
    status: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Complete Todo App on Front Mentor",
    status: false,
  },
];

function App() {
  const { mode, setMode } = useColorScheme();

  const [taskInfo, setTaskInfo] = useState({
    title: "",
    status: false,
  });

  const [todos, setTodos] = useState(initialTasks);

  const [filter, setFilter] = useState("all");
  const [dragIndex, setDragIndex] = useState(null);

  const targetTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.status);
    } else if (filter === "completed") {
      return todos.filter((todo) => todo.status);
    } else {
      return todos;
    }
  }, [filter, todos]);

  const activeTasksCount = useMemo(() => {
    return todos.filter((todo) => !todo.status).length;
  }, [todos]);

  useEffect(() => {
    function getTodos() {
      setTodos(JSON.parse(localStorage.getItem("tasks")) || initialTasks);
    }
    getTodos();
  }, []);

  const addToStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleChangeStatus = () => {
    setTaskInfo((prev) => ({ ...prev, status: !prev.status }));
  };
  const handleChangeTitle = (value) => {
    setTaskInfo((prev) => ({ ...prev, title: value }));
  };

  const handleChangeMode = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!taskInfo.title.trim()) return;
    const newTask = {
      id: crypto.randomUUID(),
      title: taskInfo.title,
      status: taskInfo.status,
    };

    const updatedTasks = [...todos, newTask];
    setTodos(updatedTasks);
    addToStorage(updatedTasks);
    setTaskInfo({ title: "", status: false });
  };

  const handleUpdateTask = (id) => {
    const updatedTasks = todos.map((todo) => {
      if (todo.id === id) return { ...todo, status: !todo.status };
      else return todo;
    });

    setTodos(updatedTasks);
    addToStorage(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTasks);
    addToStorage(updatedTasks);
  };

  const handleClearCompleted = () => {
    const updatedTasks = todos.filter((todo) => !todo.status);
    setTodos(updatedTasks);
    addToStorage(updatedTasks);
  };

  const handleDragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIndex) return;

    const newTodos = [...todos];
    const [movedItem] = newTodos.splice(dragIndex, 1);
    newTodos.splice(dropIndex, 0, movedItem);
    setTodos(newTodos);
    addToStorage(newTodos);
    setDragIndex(null);
  };
  return (
    <Box
      component="main"
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "background.default",
        paddingBlockStart: { xs: "3rem", sm: "4.75rem" },
      }}
    >
      <Box
        component="img"
        src={mode === "dark" ? bgMobileDark : bgMobileLight}
        alt={mode === "dark" ? "Dark Mode Background" : "Light Mode Background"}
        sx={{
          position: "absolute",
          height: 200,
          width: "100%",
          top: 0,
          left: 0,
          display: { xs: "block", sm: "none" },
        }}
      />
      <Box
        component="img"
        src={mode === "dark" ? bgDesktopDark : bgDesktopLight}
        alt={mode === "dark" ? "Dark Mode Background" : "Light Mode Background"}
        sx={{
          position: "absolute",
          height: 300,
          width: "100%",
          top: 0,
          left: 0,
          display: { xs: "none", sm: "block" },
        }}
      />
      <Container
        sx={{
          maxWidth: { sm: 540 },
          paddingInline: { xs: "1.5rem", sm: 0 },
          position: "relative",
        }}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="h1"
            textTransform="uppercase"
            fontSize={{ xs: "1.75rem", sm: "2.5rem" }}
            fontWeight={700}
            letterSpacing={{ xs: ".75rem", sm: "1rem" }}
            color="white"
          >
            Todo
          </Typography>
          <IconButton
            disableRipple
            aria-label="Change Theme"
            sx={{ padding: 0 }}
            onClick={handleChangeMode}
          >
            {mode === "dark" ? <SunIcon /> : <MoonIcon />}
          </IconButton>
        </Stack>
        <Stack
          component="form"
          flexDirection="row"
          alignItems="center"
          sx={{
            backgroundColor: "background.paper",
            padding: { xs: "14px 1.25rem 10px", sm: "1.25rem 1.5rem 1rem" },
            borderRadius: ".5rem",
            marginBlock: { xs: "2rem 1rem", sm: "34px 1.5rem" },
          }}
        >
          <Box
            sx={{
              width: { xs: 20, sm: 24 },
              height: { xs: 20, sm: 24 },
              padding: "1px",
              borderRadius: "50%",
              backgroundColor: "secondary.main",
              backgroundImage: taskInfo.status
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
                backgroundColor: taskInfo.status
                  ? "transparent"
                  : "background.paper",
              }}
              onClick={handleChangeStatus}
            >
              {taskInfo.status && <CheckIcon />}
            </IconButton>
          </Box>
          <TextField
            id="task-title"
            variant="standard"
            autoComplete="off"
            placeholder="Create a new todo..."
            value={taskInfo.title}
            onChange={(e) => handleChangeTitle(e.target.value)}
            sx={{
              flex: 1,
              marginInlineStart: { xs: 1.5, sm: 3 },
              "& input": {
                height: "auto",
                padding: 0,
                fontSize: { xs: "12px", sm: "18px" },
                color: "text.primary",
                caretColor: "hsl(220, 98%, 61%)",
              },
              "& .MuiInputBase-root": {
                "&::before": {
                  border: "none",
                },
                "&::after": {
                  border: "none",
                },
                "&:hover": {
                  "&:not(.Mui-disabled, .Mui-error)": {
                    "&::before": {
                      border: "none",
                    },
                  },
                },
              },
            }}
          />
          <Button
            type="submit"
            disableRipple
            aria-label="Create Task"
            sx={{ padding: 0, minWidth: 0 }}
            onClick={handleCreateTask}
          ></Button>
        </Stack>
        <Box
          component="section"
          sx={{
            borderRadius: ".5rem",
            backgroundColor: "background.paper",
            boxShadow:
              mode === "dark"
                ? "0px 16px 20px hsl(0deg 0% 0% / 37%)"
                : "0px 16px 30px hsl(0deg 0% 0% / 10%)",
          }}
        >
          {targetTodos.map((todo, index) => (
            <Todo
              key={todo.id}
              todo={todo}
              handleUpdate={handleUpdateTask}
              handleDelete={handleDeleteTask}
              draggable={filter === "all"}
              onDragStart={(e) => filter === "all" && handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => filter === "all" && handleDrop(e, index)}
            />
          ))}
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            padding={{ xs: "19px 20px", sm: "18px 1.5rem 17px" }}
          >
            <Typography
              variant="body2"
              lineHeight={1}
              fontSize={{ xs: "12px", sm: "15px" }}
              color="text.secondary"
            >
              {activeTasksCount} {activeTasksCount > 1 ? "items" : "item"} left
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={filter}
              exclusive
              onChange={handleChangeFilter}
              aria-label="Filter Tasks"
              sx={{ display: { xs: "none", sm: "inline-flex" }, gap: 2.5 }}
            >
              <ToggleButton
                disableRipple
                value="all"
                sx={{
                  padding: 0,
                  border: "none",
                  fontSize: "15px",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "text.secondary",
                  textTransform: "none",
                  transition: "color .3s",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "action.hover",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "transparent",
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  },
                }}
              >
                All
              </ToggleButton>
              <ToggleButton
                disableRipple
                value="active"
                sx={{
                  padding: 0,
                  border: "none",
                  fontSize: "15px",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "text.secondary",
                  textTransform: "none",
                  transition: "color .3s",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "action.hover",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "transparent",
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  },
                }}
              >
                Active
              </ToggleButton>
              <ToggleButton
                disableRipple
                value="completed"
                sx={{
                  padding: 0,
                  border: "none",
                  fontSize: "15px",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "text.secondary",
                  textTransform: "none",
                  transition: "color .3s",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "action.hover",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "transparent",
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  },
                }}
              >
                Completed
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              disableRipple
              aria-label="Delete Completed Tasks"
              sx={{
                lineHeight: 1,
                fontSize: { xs: "12px", sm: "14px" },
                padding: 0,
                color: "text.secondary",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "text.primary",
                },
                "&.Mui-focusVisible": { color: "text.primary" },
              }}
              onClick={handleClearCompleted}
            >
              Clear Completed
            </Button>
          </Stack>
        </Box>

        <ToggleButtonGroup
          color="primary"
          fullWidth
          value={filter}
          exclusive
          onChange={handleChangeFilter}
          aria-label="Filter Tasks"
          sx={{
            display: { xs: "inline-flex", sm: "none" },
            justifyContent: "center",
            backgroundColor: "background.paper",
            padding: "17px 0 16px",
            borderRadius: ".5rem",
            gap: 2.5,
            marginBlockStart: 2,
            boxShadow: "5px 5px 10px hsl(0deg 0% 0% / 3%)",
          }}
        >
          <ToggleButton
            disableRipple
            value="all"
            sx={{
              width: "auto",
              padding: 0,
              border: "none",
              fontSize: "15px",
              fontWeight: 700,
              lineHeight: 1,
              color: "text.secondary",
              textTransform: "none",
              transition: "color .3s",
              "&:hover": {
                backgroundColor: "transparent",
                color: "action.hover",
              },
              "&.Mui-selected": {
                backgroundColor: "transparent",
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
            }}
          >
            All
          </ToggleButton>
          <ToggleButton
            disableRipple
            value="active"
            sx={{
              width: "auto",
              padding: 0,
              border: "none",
              fontSize: "15px",
              fontWeight: 700,
              lineHeight: 1,
              color: "text.secondary",
              textTransform: "none",
              transition: "color .3s",
              "&:hover": {
                backgroundColor: "transparent",
                color: "action.hover",
              },
              "&.Mui-selected": {
                backgroundColor: "transparent",
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
            }}
          >
            Active
          </ToggleButton>
          <ToggleButton
            disableRipple
            value="completed"
            sx={{
              width: "auto",
              padding: 0,
              border: "none",
              fontSize: "15px",
              fontWeight: 700,
              lineHeight: 1,
              color: "text.secondary",
              textTransform: "none",
              transition: "color .3s",
              "&:hover": {
                backgroundColor: "transparent",
                color: "action.hover",
              },
              "&.Mui-selected": {
                backgroundColor: "transparent",
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
            }}
          >
            Completed
          </ToggleButton>
        </ToggleButtonGroup>
        {filter === "all" && (
          <Typography
            variant="h3"
            fontSize="15px"
            fontWeight={400}
            color="text.secondary"
            textAlign="center"
            marginBlockStart={{ xs: 5.25, sm: 6.5 }}
          >
            Drag and drop to reorder list
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default App;
