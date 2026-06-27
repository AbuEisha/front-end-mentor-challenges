import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import Logo from "../assets/images/logo.svg?react";

import FacebookIcon from "../assets/images/icon-facebook.svg?react";
import YoutubeIcon from "../assets/images/icon-youtube.svg?react";
import TwitterIcon from "../assets/images/icon-twitter.svg?react";
import PinterestIcon from "../assets/images/icon-pinterest.svg?react";
import InstagramIcon from "../assets/images/icon-instagram.svg?react";

const linksList1 = ["Home", "Pricing", "Products", "About Us"];
const linksList2 = ["Careers", "Community", "Privacy Policy"];

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const [emailErrors, setEmailErrors] = useState(null);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === "") {
      setEmailErrors("Field mustn't be empty");
    } else if (!emailRegex.test(email)) {
      setEmailErrors("Please insert a valid email");
    } else {
      setEmailErrors(null);
    }
  };
  return (
    <Box
      component="footer"
      paddingBlock={{ xs: "53px 30px", md: "62px" }}
      sx={{ backgroundColor: "hsl(233, 12%, 13%)" }}
    >
      <Container
        sx={{
          maxWidth: { lg: "1110px" },
          paddingInline: { xs: "1.5rem", lg: 0 },
        }}
      >
        <Grid container spacing={{ xs: "56px", md: 0 }}>
          <Grid
            size={{ xs: 12, md: 3 }}
            order={{ xs: 5, md: 1 }}
            textAlign={{ xs: "center", md: "start" }}
          >
            <Box
              sx={{
                "& svg": {
                  "& >g": {
                    "& >path": {
                      fill: "white",
                    },
                  },
                },
              }}
            >
              <Logo />
            </Box>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }} order={2}>
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: 0,
                marginBlockStart: "6px",
                marginInlineStart: { xs: "2.5rem", md: 0 },
              }}
            >
              {linksList1.map((link) => (
                <ListItem key={link} sx={{ padding: 0 }}>
                  <Button
                    disableRipple
                    sx={{
                      fontSize: "13px",
                      lineHeight: 1,
                      textTransform: "none",
                      color: "background.default",
                      justifyContent: "flex-start",
                      padding: 0,
                      "&:hover": {
                        color: "primary.main",
                      },
                      "&.Mui-focusVisible": {
                        color: "primary.main",
                      },
                    }}
                  >
                    {link}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }} order={3}>
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: 0,
                marginBlockStart: "6px",
              }}
            >
              {linksList2.map((link) => (
                <ListItem key={link} sx={{ padding: 0 }}>
                  <Button
                    disableRipple
                    sx={{
                      fontSize: "13px",
                      lineHeight: 1,
                      textTransform: "none",
                      color: "background.default",
                      justifyContent: "flex-start",
                      padding: 0,
                      "&:hover": {
                        color: "primary.main",
                      },
                      "&.Mui-focusVisible": {
                        color: "primary.main",
                      },
                    }}
                  >
                    {link}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }} order={{ xs: 1, md: 4 }}>
            <Box sx={{ marginBlockStart: "4px" }}>
              <Box component="form" display="flex" gap={1} width="100%">
                <TextField
                  id="outlined-basic"
                  variant="filled"
                  placeholder="Updates in your inbox…"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    flex: 1,
                    "& .MuiFilledInput-root": {
                      "& ::placeholder": {
                        fontSize: "13px",
                        color: "rgba(0, 0, 0, 0.87)",
                      },
                      "&:hover": {
                        "&:not(.Mui-disabled, .Mui-error)": {
                          "&::before": {
                            border: "none",
                          },
                        },
                      },
                      "&::before": {
                        border: "none",
                      },
                      "&::after": {
                        border: "none",
                      },
                    },
                    "& input": {
                      padding: "10.25px 16px",
                      borderRadius: "24px",
                      backgroundColor: "white",
                      fontSize: "15px",
                      color: "primary.main",
                      border: "1px solid",
                      borderColor: emailErrors ? "primary.main" : "white",
                    },
                  }}
                />
                <Button
                  disableRipple
                  type="submit"
                  onClick={handleEmailSubmit}
                  sx={{
                    fontSize: "13px",
                    backgroundColor: "primary.main",
                    color: "background.default",
                    textTransform: "none",
                    borderRadius: "24px",
                    "&:hover": {
                      backgroundColor: "hsl(12deg 100% 75.43%)",
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: "hsl(12deg 100% 75.43%)",
                    },
                  }}
                >
                  Go
                </Button>
              </Box>
              {emailErrors && (
                <Typography
                  variant="body1"
                  fontSize="10px"
                  color="primary.main"
                  paddingInlineStart="18px"
                  marginBlockStart="8px"
                >
                  {emailErrors}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} order={{ xs: 4, md: 5 }}>
            <List
              sx={{
                display: "flex",
                gap: "12px",
                justifyContent: { xs: "space-between", md: "flex-start" },
                padding: 0,
                marginBlockStart: { md: "-16px" },
              }}
            >
              <ListItem
                sx={{
                  padding: 0,
                  width: "auto",
                }}
              >
                <IconButton
                  aria-label="Open Facebook"
                  disableRipple
                  sx={{
                    padding: 0,
                    "& svg": {
                      "& path": {
                        transition: "fill .3s ease",
                      },
                    },
                    "&:hover": {
                      "& svg": {
                        "& path": {
                          fill: "hsl(12, 88%, 59%)",
                        },
                      },
                    },
                    "&.Mui-focusVisible": {
                      "& svg": {
                        "& path": {
                          fill: "hsl(12, 88%, 59%)",
                        },
                      },
                    },
                  }}
                >
                  <FacebookIcon />
                </IconButton>
              </ListItem>
              <ListItem sx={{ padding: 0, width: "auto" }}>
                <IconButton
                  aria-label="Open Youtube"
                  disableRipple
                  sx={{
                    padding: 0,
                    "& svg": {
                      "& path": {
                        transition: "fill .3s ease",
                      },
                    },
                    "&:hover": {
                      "& svg": {
                        "& path": {
                          fill: "hsl(12, 88%, 59%)",
                        },
                      },
                    },
                    "&.Mui-focusVisible": {
                      "& svg": {
                        "& path": {
                          fill: "hsl(12, 88%, 59%)",
                        },
                      },
                    },
                  }}
                >
                  <YoutubeIcon />
                </IconButton>
              </ListItem>
              <ListItem sx={{ padding: 0, width: "auto" }}>
                <IconButton
                  aria-label="Open Twitter"
                  disableRipple
                  sx={{
                    padding: 0,
                    "& svg": {
                      "& path": {
                        transition: "fill .3s ease",
                      },
                    },
                    "&:hover": {
                      "& svg": {
                        "& path": {
                          fill: "hsl(12, 88%, 59%)",
                        },
                      },
                    },
                    "&.Mui-focusVisible": {
                      "& svg": {
                        "& path": {
                          fill: "hsl(12, 88%, 59%)",
                        },
                      },
                    },
                  }}
                >
                  <TwitterIcon />
                </IconButton>
              </ListItem>
              <ListItem sx={{ padding: 0, width: "auto" }}>
                <IconButton
                  aria-label="Open Pinterest"
                  disableRipple
                  sx={{
                    padding: 0,
                    "& svg": {
                      "& path": {
                        transition: "fill .3s ease",
                      },
                    },
                    "&:hover": {
                      "& svg": {
                        "& path": {
                          fill: "hsl(12, 88%, 59%)",
                        },
                      },
                    },
                    "&.Mui-focusVisible": {
                      "& svg": {
                        "& path": {
                          fill: "hsl(12, 88%, 59%)",
                        },
                      },
                    },
                  }}
                >
                  <PinterestIcon />
                </IconButton>
              </ListItem>
              <ListItem sx={{ padding: 0, width: "auto" }}>
                <IconButton
                  aria-label="Open Instagram"
                  disableRipple
                  sx={{
                    padding: 0,
                    "& svg": {
                      "& path": {
                        transition: "fill .3s ease",
                      },
                    },
                    "&:hover": {
                      "& svg": {
                        "& path": {
                          fill: "hsl(12, 88%, 59%)",
                        },
                      },
                    },
                    "&.Mui-focusVisible": {
                      "& svg": {
                        "& path": {
                          fill: "hsl(12, 88%, 59%)",
                        },
                      },
                    },
                  }}
                >
                  <InstagramIcon />
                </IconButton>
              </ListItem>
            </List>
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            order={6}
            textAlign={{ xs: "center", md: "end" }}
          >
            <Typography
              variant="body1"
              fontSize="13px"
              color="hsl(233deg 0.18% 50.46%)"
              marginBlockStart={{ md: "-16px" }}
            >
              {"Copyright 2020. All Rights Reserved"}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
