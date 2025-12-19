import {
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import "./App.css";
import { useColorScheme, useTheme } from "@mui/material/styles";
import Logo from "./assets/images/logo.svg?react";
import SunIcon from "./assets/images/icon-sun.svg?react";
import MoonIcon from "./assets/images/icon-moon.svg?react";
import { useState, useEffect, useMemo } from "react";
import ExtensionCard from "./ExtensionCard";
import initialExtensions from "./assets/data/data.json";
import RemoveDialog from "./RemoveDialog";

const images = import.meta.glob("./assets/images/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});

function App() {
  const { mode, setMode } = useColorScheme();
  const theme = useTheme();
  const [alignment, setAlignment] = useState("all");
  const [extensions, setExtensions] = useState(initialExtensions);
  const [open, setOpen] = useState(false);
  const [deletedExtension, setDeletedExtension] = useState(null);

  const activeExtensions = useMemo(
    () => extensions.filter((ext) => ext.isActive),
    [extensions]
  );
  const inactiveExtensions = useMemo(
    () => extensions.filter((ext) => !ext.isActive),
    [extensions]
  );

  useEffect(() => {
    setMode("dark");
  }, []);

  // Event Handler
  const handleChange = (e) => {
    setAlignment(e.target.value);
  };

  const toggleMode = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  const handleExtensionStatus = (name) => {
    setExtensions((prev) =>
      prev.map((ext) => {
        if (ext.name === name) return { ...ext, isActive: !ext.isActive };
        else return ext;
      })
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDialog = (extensionName) => {
    setDeletedExtension(extensionName);
    setOpen(true);
  };

  const handleDeleteExtension = () => {
    setExtensions((prev) =>
      prev.filter((ext) => ext.name !== deletedExtension)
    );
    handleClose();
  };

  //  Styles

  const toggleButtonsStyles = {
    gap: "1rem",
    ".MuiToggleButton-root": {
      padding: "0.375rem 1.25rem",
      borderRadius: "1.5rem",
      margin: 0,
      fontWeight: 400,
      fontSize: "1rem",
      textTransform: "none",
      backgroundColor:
        mode === "dark" ? "background.paper" : "background.default",
      color: "text.secondary",
      border: "0.0625rem solid",
      borderColor: "special.borderHover",
      boxShadow:
        mode === "dark"
          ? "none"
          : "0 0.125rem 0.3125rem hsl(0deg 0% 78% / 33%)",
      "&:focus": {
        borderWidth: "0.125rem",
        borderColor: "background.default",
        outline: "0.125rem solid",
        outlineColor: "primary.main",
        "&:not(.Mui-selected)": {
          backgroundColor:
            mode === "dark" ? "special.iconHover" : "background.default",
        },
      },
      "&:hover": {
        backgroundColor:
          mode === "dark" ? "special.iconHover" : "background.default",
        opacity: mode === "dark" ? 1 : 0.65,
      },
      "&.Mui-selected": {
        backgroundColor: mode === "dark" ? "primary.main" : "primary.dark",
        color: "special.activeButton",
        fontSize: "1.125rem",
        fontWeight: 500,
        "&:not(:focus)": {
          borderColor: "primary.main",
        },
        "&:hover": {
          backgroundColor: mode === "dark" ? "primary.light" : "primary.dark",
          opacity: mode === "dark" ? 1 : 0.8,
        },
      },
    },
  };

  return (
    <Box
      component="main"
      minHeight="100vh"
      sx={{ background: theme.palette.special.gradiant }}
    >
      <Container
        sx={{
          maxWidth: { sm: "35.625rem", md: "54.375rem", lg: "73.125rem" },
          paddingBlockStart: { xs: "1.5rem", sm: "2rem" },
        }}
      >
        <Box
          component="header"
          sx={{
            backgroundColor: "background.default",
            padding: { xs: ".5rem", sm: ".73rem" },
            borderRadius: ".85rem",
            boxShadow:
              mode === "dark"
                ? "none"
                : "0 0.125rem 0.3125rem hsl(0deg 0% 78% / 33%)",
          }}
        >
          <Grid container alignItems="center">
            <Grid
              size={8}
              sx={{
                ".logo-text": { fill: theme.palette.text.primary },
              }}
            >
              <Logo />
            </Grid>
            <Grid size={4} textAlign="end">
              <IconButton
                onClick={toggleMode}
                sx={{
                  backgroundColor: "background.paper",
                  width: "3.25rem",
                  height: "3.25rem",
                  borderRadius: ".75rem",
                  "&:hover": {
                    backgroundColor: "special.iconHover",
                  },
                  "&:focus": {
                    backgroundColor:
                      mode === "dark"
                        ? "special.iconHover"
                        : "background.paper",
                    border: "0.125rem solid",
                    borderColor: "background.default",
                    outline: "0.125rem solid",
                    outlineColor: "primary.main",
                  },
                }}
              >
                {mode === "dark" ? <SunIcon /> : <MoonIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Box
          component="section"
          marginBlockStart={{ xs: "2.75rem", sm: "4rem" }}
        >
          <Grid container rowSpacing="1.75rem">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "text.primary",
                  textAlign: { xs: "center", md: "start" },
                }}
              >
                Extensions List
              </Typography>
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              textAlign={{ xs: "center", md: "end" }}
            >
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="section"
                sx={toggleButtonsStyles}
              >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="active">Active</ToggleButton>
                <ToggleButton value="inactive">Inactive</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Box>
        <Box component="section" paddingBlock="2rem 4rem">
          <Grid container spacing={{ xs: 1.5, md: 2 }}>
            {alignment === "all" &&
              extensions.map((ext, i) => {
                const fileName = ext.logo.split("/").pop();
                const imageKey = `./assets/images/${fileName}`;
                const imgSrc = images[imageKey];

                return (
                  <Grid key={i} size={{ xs: 12, md: 6, lg: 4 }}>
                    <ExtensionCard
                      mode={mode}
                      extension={ext}
                      imgSrc={imgSrc}
                      handleChange={handleExtensionStatus}
                      handleOpen={handleOpenDialog}
                    />
                  </Grid>
                );
              })}
            {alignment === "active" &&
              activeExtensions.map((ext, i) => {
                const fileName = ext.logo.split("/").pop();
                const imageKey = `./assets/images/${fileName}`;
                const imgSrc = images[imageKey];

                return (
                  <Grid key={i} size={{ xs: 12, md: 6, lg: 4 }}>
                    <ExtensionCard
                      mode={mode}
                      extension={ext}
                      imgSrc={imgSrc}
                      handleChange={handleExtensionStatus}
                      handleOpen={handleOpenDialog}
                    />
                  </Grid>
                );
              })}
            {alignment === "inactive" &&
              inactiveExtensions.map((ext, i) => {
                const fileName = ext.logo.split("/").pop();
                const imageKey = `./assets/images/${fileName}`;
                const imgSrc = images[imageKey];

                return (
                  <Grid key={i} size={{ xs: 12, md: 6, lg: 4 }}>
                    <ExtensionCard
                      mode={mode}
                      extension={ext}
                      imgSrc={imgSrc}
                      handleChange={handleExtensionStatus}
                      handleOpen={handleOpenDialog}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Container>
      <RemoveDialog
        open={open}
        handleClose={handleClose}
        mode={mode}
        handleDelete={handleDeleteExtension}
      />
    </Box>
  );
}

export default App;
