import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import "./App.css";

import headerBgMobile from "./assets/images/bg-header-mobile.svg";
import headerBgDesktop from "./assets/images/bg-header-desktop.svg";

import removeIcon from "./assets/images/icon-remove.svg";
import JobCard from "./JobCard";

import jobData from "./assets/data.json";

function App() {
  const [filter, setFilter] = useState([]);

  const filterJobData = useMemo(
    () =>
      jobData.filter((job) => {
        const keywords = [job.role, job.level, ...job.languages, ...job.tools];
        return filter.every((item) => keywords.includes(item));
      }),
    [filter],
  );

  const handleAddToFilter = (item) => {
    setFilter((prev) => {
      if (prev.includes(item)) return prev;
      else return [...prev, item];
    });
  };

  const handleRemoveFilterItem = (item) => {
    setFilter((prev) => prev.filter((i) => i !== item));
  };
  const handleRemoveAllFilter = () => {
    setFilter([]);
  };
  return (
    <Box
      component="main"
      minHeight="100vh"
      sx={{
        backgroundColor: "background.default",
      }}
    >
      <Box
        component="header"
        sx={{
          backgroundColor: "primary.main",
        }}
      >
        <Box
          component="img"
          src={headerBgMobile}
          alt="Mobile Header Background"
          display={{ xs: "block", sm: "none" }}
          width="100%"
          maxHeight="156px"
        />
        <Box
          component="img"
          src={headerBgDesktop}
          alt="Desktop Header Background"
          display={{ xs: "none", sm: "block" }}
          width="100%"
          maxHeight="156px"
        />
      </Box>
      <Container
        sx={{
          maxWidth: { lg: "1110px" },
          paddingInline: { xs: "1.5rem", lg: 0 },
        }}
      >
        {filter.length !== 0 && (
          <Stack
            flexDirection="row"
            alignItems="center"
            gap={2}
            sx={{
              padding: { xs: "1.25rem", md: "1.25rem 2.5rem" },
              borderRadius: "6px",
              backgroundColor: "white",
              marginBlockStart: "-2.25rem",
              position: "relative",
              boxShadow: "5px 5px 20px hsl(180deg 29% 50% / 25%)",
            }}
          >
            <List
              sx={{
                flex: 1,
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                padding: 0,
              }}
            >
              {filter.map((item) => (
                <ListItem
                  key={item}
                  sx={{
                    p: 0,
                    width: "auto",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    variant="body1"
                    fontSize="15px"
                    fontWeight={700}
                    lineHeight={1}
                    sx={{
                      p: "8.5px 10px",
                      backgroundColor: "background.default",
                      color: "primary.main",
                    }}
                  >
                    {item}
                  </Typography>
                  <IconButton
                    disableRipple
                    aria-label={`Remove ${item} Filter`}
                    sx={{
                      borderRadius: 0,
                      backgroundColor: "primary.main",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                      "&.Mui-focusVisible": {
                        backgroundColor: "primary.dark",
                      },
                    }}
                    onClick={() => handleRemoveFilterItem(item)}
                  >
                    <Box component="img" src={removeIcon} alt="Remove Icon" />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            <Button
              disableRipple
              aria-label="Clear All Filter Items"
              sx={{
                minWidth: "auto",
                p: 0,
                textTransform: "none",
                fontSize: { xs: "16px", md: "15px" },
                fontWeight: 700,
                lineHeight: 1,
                color: "primary.light",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "primary.main",
                  textDecoration: "underline",
                },
                "&.Mui-focusVisible": {
                  backgroundColor: "transparent",
                  color: "primary.main",
                  textDecoration: "underline",
                },
              }}
              onClick={handleRemoveAllFilter}
            >
              Clear
            </Button>
          </Stack>
        )}

        <Stack
          paddingBlock={
            filter.length === 0
              ? { xs: "56px 34px", md: "74px 122px" }
              : { xs: "3.5rem 34px", md: "2.5rem 122px" }
          }
          gap={{ xs: 5, md: 3 }}
        >
          {filterJobData.map((job) => (
            <JobCard
              key={job.id}
              detials={job}
              jobInfo={[job.postedAt, job.contract, job.location]}
              keywords={[job.role, job.level, ...job.languages, ...job.tools]}
              handleFilter={handleAddToFilter}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
