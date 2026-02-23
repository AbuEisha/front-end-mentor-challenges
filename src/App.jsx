import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import mainBgDesktop from "./assets/images/bg-main-desktop.png";
import mainBgMobile from "./assets/images/bg-main-mobile.png";
import cardBgFront from "./assets/images/bg-card-front.png";
import cardBgBack from "./assets/images/bg-card-back.png";
import cardLogo from "./assets/images/card-logo.svg";
import completeIcon from "./assets/images/icon-complete.svg";
import "./App.css";
import { useState } from "react";

export default function App() {
  const [cardInfo, setCardInfo] = useState({
    cardHolder: "",
    cardNumber: "",
    cardDate: { month: "", year: "" },
    cardCvc: "",
  });

  const [cardInfoErrors, setCardInfoErrors] = useState({
    cardHolderError: "",
    cardNumberError: "",
    cardDateError: { month: "", year: "" },
    cardCvcError: "",
  });

  const [isCompleted, setIsCompleted] = useState(false);

  const handleChange = (e, valueName) => {
    if (valueName === "cardDate.month") {
      setCardInfo({
        ...cardInfo,
        cardDate: { ...cardInfo.cardDate, month: e.target.value },
      });
      if (cardInfoErrors.cardDateError.month) {
        setCardInfoErrors({
          ...cardInfoErrors,
          cardDateError: { ...cardInfoErrors.cardDateError, month: "" },
        });
      }
    } else if (valueName === "cardDate.year") {
      setCardInfo({
        ...cardInfo,
        cardDate: { ...cardInfo.cardDate, year: e.target.value },
      });
      if (cardInfoErrors.cardDateError.year) {
        setCardInfoErrors({
          ...cardInfoErrors,
          cardDateError: { ...cardInfoErrors.cardDateError, year: "" },
        });
      }
    } else {
      setCardInfo({ ...cardInfo, [valueName]: e.target.value });
      if (cardInfoErrors[`${valueName}Error`]) {
        setCardInfoErrors({ ...cardInfoErrors, [`${valueName}Error`]: "" });
      }
    }
  };

  const handleCardNumberChange = (e) => {
    if (cardInfoErrors.cardNumberError) {
      setCardInfoErrors({ ...cardInfoErrors, cardNumberError: "" });
    }
    const input = e.target;
    let rawValue = input.value.replace(/\s+/g, "");
    rawValue = rawValue.slice(0, 16);

    let formattedValue = "";
    for (let i = 0; i < rawValue.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " ";
      }
      formattedValue += rawValue[i];
    }

    const cursorPos = input.selectionStart;
    const oldValue = input.value;

    setCardInfo({ ...cardInfo, cardNumber: formattedValue });

    setTimeout(() => {
      if (input) {
        const spacesBefore = (oldValue.slice(0, cursorPos).match(/\s/g) || [])
          .length;
        const nonSpacesBefore = cursorPos - spacesBefore;
        let prefixFormatted = "";
        for (let i = 0; i < nonSpacesBefore; i++) {
          if (i > 0 && i % 4 === 0) {
            prefixFormatted += " ";
          }
          prefixFormatted += rawValue[i] || "";
        }
        const newCursorPos = prefixFormatted.length;
        input.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameRegex = /^[A-Z][a-z]* [A-Z][a-z]*$/;
    const cardNumberRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
    const errors = {
      cardHolderError: !cardInfo.cardHolder.trim()
        ? "Can't be blank"
        : !nameRegex.test(cardInfo.cardHolder)
          ? "Must be a valid name"
          : "",
      cardNumberError: !cardInfo.cardNumber.trim()
        ? "Can't be blank"
        : !cardNumberRegex.test(cardInfo.cardNumber)
          ? "Wrong format, numbers only"
          : "",
      cardDateError: {
        month: !cardInfo.cardDate.month.trim()
          ? "Can't be blank"
          : !/^(0?[1-9]|1[0-2])$/.test(cardInfo.cardDate.month)
            ? "Wrong format"
            : "",
        year: !cardInfo.cardDate.year.trim()
          ? "Can't be blank"
          : !/^[2-9][0-9]$/.test(cardInfo.cardDate.year)
            ? "Wrong format"
            : "",
      },
      cardCvcError: !cardInfo.cardCvc.trim()
        ? "Can't be blank"
        : !/^\d{3}$/.test(cardInfo.cardCvc)
          ? "Wrong format"
          : "",
    };

    const hasErrors = Object.values(errors).some((e) => {
      if (typeof e === "object") {
        return Object.values(e).some((subError) => subError);
      } else return e;
    });

    if (hasErrors) {
      setCardInfoErrors(errors);
      return;
    } else {
      setCardInfoErrors({
        cardHolderError: "",
        cardNumberError: "",
        cardDateError: { month: "", year: "" },
        cardCvcError: "",
      });
      setIsCompleted(true);
      setCardInfo({
        cardHolder: "",
        cardNumber: "",
        cardDate: { month: "", year: "" },
        cardCvc: "",
      });
    }
  };

  return (
    <Box component="main">
      <Grid container spacing={{ xs: "5.75rem", sm: "15rem", md: "0" }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box position="relative">
            <Box
              component="img"
              src={mainBgMobile}
              alt="Main Bg Mobile"
              display={{ xs: "block", md: "none" }}
              maxWidth="100%"
            />
            <Box
              component="img"
              src={mainBgDesktop}
              alt="Main Bg Desktop"
              display={{ xs: "none", md: "block" }}
              maxWidth="100%"
            />
            <Stack
              sx={{
                position: "absolute",
                width: { sm: "447px" },
                maxWidth: "447px",
                top: { xs: "2rem", md: "50%" },
                right: { xs: "16px", sm: "auto", lg: "-223.5px" },
                left: { xs: "73px", sm: "50%", lg: "auto" },
                transform: {
                  xs: "translateY(0)",
                  sm: "translateX(-50%)",
                  md: "translate(-50%, -50%)",
                  lg: "translateY(-50%)",
                },
              }}
              gap={{ xs: 0, md: "2.5rem" }}
            >
              <Box
                marginInlineStart={{ xs: "0", lg: "-6.1rem" }}
                position="relative"
                order={{ xs: 1, md: 0 }}
                top={{ xs: "-68px", sm: "-106px", md: "auto" }}
                left={{ xs: "-62px", sm: "-88px", md: "auto" }}
              >
                <Box
                  component="img"
                  src={cardBgFront}
                  alt="Card Bg Front"
                  display="block"
                  maxWidth="100%"
                />
                <Box
                  position="absolute"
                  left={0}
                  top={0}
                  width={{ xs: "100%", lg: "calc(100% - 6.1rem)" }}
                  height="100%"
                  padding={{ xs: "1rem", sm: "2rem" }}
                  color="hsl(0, 100%, 100%)"
                  letterSpacing="3px"
                >
                  <Box component="img" src={cardLogo} alt="Card Logo" />

                  <Typography
                    variant="h1"
                    fontSize={{ xs: "1.07rem", sm: "1.78rem" }}
                    marginBlock={{ xs: "1.75rem 1rem", sm: "3rem 1.75rem" }}
                  >
                    {cardInfo.cardNumber
                      ? cardInfo.cardNumber
                      : "0000 0000 0000 0000"}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      variant="body1"
                      textTransform="uppercase"
                      fontSize={{ xs: ".65rem", sm: ".85rem" }}
                    >
                      {cardInfo.cardHolder
                        ? cardInfo.cardHolder
                        : "Jane Appleseed"}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontSize={{ xs: ".65rem", sm: ".85rem" }}
                    >
                      {cardInfo.cardDate.month
                        ? `${cardInfo.cardDate.month.length === 1 && +cardInfo.cardDate.month < 10 ? "0" + cardInfo.cardDate.month : cardInfo.cardDate.month}/`
                        : "00/"}
                      {cardInfo.cardDate.year ? cardInfo.cardDate.year : "00"}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
              <Box order={{ xs: 0, md: 1 }}>
                <Box position="relative">
                  <Box
                    component="img"
                    src={cardBgBack}
                    alt="Card Bg Back"
                    display="block"
                    maxWidth="100%"
                  />
                  <Typography
                    variant="body1"
                    fontSize={{ xs: ".65rem", sm: ".85rem" }}
                    letterSpacing="3px"
                    position="absolute"
                    color="hsl(0, 100%, 100%)"
                    top={{ xs: "50%", sm: "49.5%" }}
                    right={{ xs: "34px", sm: "60px" }}
                    sx={{ transform: "translateY(-50%)" }}
                  >
                    {cardInfo.cardCvc ? cardInfo.cardCvc : "000"}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid
          sx={{ "&&": { flexGrow: "1" } }}
          size={{ xs: 12, md: 8 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            width="384px"
            paddingInline={{ xs: "1.5rem", sm: "0" }}
            maxWidth="100%"
            marginInlineStart={{ lg: "8.75rem" }}
          >
            {isCompleted && (
              <Box textAlign="center">
                <Box component="img" src={completeIcon} alt="Complete Icon" />
                <Typography
                  variant="h2"
                  textTransform="uppercase"
                  fontSize="2.15rem"
                  fontWeight={500}
                  color="hsl(278, 68%, 11%)"
                  marginBlock="2.25rem 1rem"
                >
                  Thank you!
                </Typography>
                <Typography
                  variant="body1"
                  fontSize="18px"
                  fontWeight={500}
                  color="hsl(212, 12%, 71%)"
                >
                  We've added your card details
                </Typography>
                <Button
                  fullWidth
                  disableRipple
                  onClick={() => setIsCompleted(false)}
                  sx={{
                    textTransform: "none",
                    backgroundColor: "hsl(278, 68%, 11%)",
                    color: "white",
                    height: "52px",
                    borderRadius: ".5rem",
                    fontSize: "16px",
                    marginBlockStart: "3rem",
                    marginBlockEnd: { xs: "4.25rem", md: "0" },
                    "&:hover": {
                      outline: "2px solid hsl(278, 68%, 11%)",
                      outlineOffset: "2px",
                    },
                    "&.Mui-focusVisible": {
                      outline: "2px solid hsl(278, 68%, 11%)",
                      outlineOffset: "2px",
                    },
                  }}
                >
                  Continue
                </Button>
              </Box>
            )}
            {!isCompleted && (
              <Box component="form">
                <Box>
                  <Typography
                    variant="button"
                    component="label"
                    htmlFor="cardholder-name"
                    fontSize={{ xs: ".78rem", md: "0.875rem" }}
                    display="block"
                    marginBlockEnd=".35rem"
                    color="hsl(278, 68%, 11%)"
                    letterSpacing="2px"
                  >
                    Cardholder Name
                  </Typography>
                  <TextField
                    variant="outlined"
                    id="cardholder-name"
                    placeholder="e.g. Jane Appleseed"
                    value={cardInfo.cardHolder}
                    onChange={(e) => handleChange(e, "cardHolder")}
                    fullWidth
                    sx={{
                      "& .MuiInputBase-root": {
                        fontSize: "18px",
                        color: "hsl(278, 68%, 11%)",
                        caretColor: "hsl(278, 68%, 11%)",
                        borderRadius: "8px",
                        height: "46px",
                        "&:not(.Mui-focused):hover": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: cardInfoErrors.cardHolderError
                              ? "hsl(0, 100%, 66%)"
                              : "hsl(212, 12%, 71%)",
                          },
                        },
                        "&.Mui-focused": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid transparent",
                            background:
                              "linear-gradient(white, white) padding-box, linear-gradient(to right, hsl(249, 99%, 64%), hsl(278, 94%, 30%)) border-box",
                            padding: "2px",
                          },
                        },
                      },

                      "& input": {
                        padding: ".65rem 1.25rem",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: cardInfoErrors.cardHolderError
                          ? "hsl(0, 100%, 66%)"
                          : "hsl(270, 3%, 87%)",
                        zIndex: -1,
                      },
                    }}
                  />
                  {cardInfoErrors.cardHolderError && (
                    <Typography
                      variant="caption"
                      color="hsl(0, 100%, 66%)"
                      marginBlockStart=".5rem"
                      display="block"
                    >
                      {cardInfoErrors.cardHolderError}
                    </Typography>
                  )}
                </Box>
                <Box marginBlockStart={{ xs: "1.25rem", md: "1.5rem" }}>
                  <Typography
                    variant="button"
                    component="label"
                    htmlFor="card-number"
                    fontSize={{ xs: ".78rem", md: "0.875rem" }}
                    display="block"
                    marginBlockEnd=".35rem"
                    color="hsl(278, 68%, 11%)"
                    letterSpacing="2px"
                  >
                    Card Number
                  </Typography>
                  <TextField
                    variant="outlined"
                    id="card-number"
                    placeholder="e.g. 1234 5678 9123 0000"
                    value={cardInfo.cardNumber}
                    onChange={handleCardNumberChange}
                    fullWidth
                    sx={{
                      "& .MuiInputBase-root": {
                        fontSize: "18px",
                        color: "hsl(278, 68%, 11%)",
                        caretColor: "hsl(278, 68%, 11%)",
                        borderRadius: "8px",
                        height: "46px",
                        "&:not(.Mui-focused):hover": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: cardInfoErrors.cardNumberError
                              ? "hsl(0, 100%, 66%)"
                              : "hsl(212, 12%, 71%)",
                          },
                        },
                        "&.Mui-focused": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid transparent",
                            background:
                              "linear-gradient(white, white) padding-box, linear-gradient(to right, hsl(249, 99%, 64%), hsl(278, 94%, 30%)) border-box",
                            padding: "2px",
                          },
                        },
                      },

                      "& input": {
                        padding: ".65rem 1.25rem",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: cardInfoErrors.cardNumberError
                          ? "hsl(0, 100%, 66%)"
                          : "hsl(270, 3%, 87%)",
                        zIndex: -1,
                      },
                    }}
                  />
                  {cardInfoErrors.cardNumberError && (
                    <Typography
                      variant="caption"
                      color="hsl(0, 100%, 66%)"
                      marginBlockStart=".5rem"
                      display="block"
                    >
                      {cardInfoErrors.cardNumberError}
                    </Typography>
                  )}
                </Box>
                <Stack
                  direction="row"
                  marginBlockStart={{ xs: "1.25rem", md: "1.5rem" }}
                  gap={{ xs: ".8rem", md: "1.25rem" }}
                >
                  <Box flex={1}>
                    <Typography
                      variant="button"
                      component="label"
                      htmlFor="month"
                      fontSize={{ xs: ".78rem", md: "0.875rem" }}
                      display="block"
                      marginBlockEnd=".35rem"
                      color="hsl(278, 68%, 11%)"
                      letterSpacing="2px"
                    >
                      Exp. Date (MM/YY)
                    </Typography>
                    <Stack direction="row" gap={{ xs: ".5rem", md: ".75rem" }}>
                      <TextField
                        variant="outlined"
                        id="month"
                        placeholder="MM"
                        value={cardInfo.cardDate.month}
                        onChange={(e) => handleChange(e, "cardDate.month")}
                        fullWidth
                        sx={{
                          "& .MuiInputBase-root": {
                            fontSize: "18px",
                            color: "hsl(278, 68%, 11%)",
                            caretColor: "hsl(278, 68%, 11%)",
                            borderRadius: "8px",
                            height: "46px",
                            "&:not(.Mui-focused):hover": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: cardInfoErrors.cardDateError.month
                                  ? "hsl(0, 100%, 66%)"
                                  : "hsl(212, 12%, 71%)",
                              },
                            },
                            "&.Mui-focused": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid transparent",
                                background:
                                  "linear-gradient(white, white) padding-box, linear-gradient(to right, hsl(249, 99%, 64%), hsl(278, 94%, 30%)) border-box",
                                padding: "2px",
                              },
                            },
                          },

                          "& input": {
                            padding: ".65rem 1.25rem",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: cardInfoErrors.cardDateError.month
                              ? "hsl(0, 100%, 66%)"
                              : "hsl(270, 3%, 87%)",
                            zIndex: -1,
                          },
                        }}
                      />
                      <TextField
                        variant="outlined"
                        id="year"
                        placeholder="YY"
                        value={cardInfo.cardDate.year}
                        onChange={(e) => handleChange(e, "cardDate.year")}
                        fullWidth
                        sx={{
                          "& .MuiInputBase-root": {
                            fontSize: "18px",
                            color: "hsl(278, 68%, 11%)",
                            caretColor: "hsl(278, 68%, 11%)",
                            borderRadius: "8px",
                            height: "46px",
                            "&:not(.Mui-focused):hover": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: cardInfoErrors.cardDateError.year
                                  ? "hsl(0, 100%, 66%)"
                                  : "hsl(212, 12%, 71%)",
                              },
                            },
                            "&.Mui-focused": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid transparent",
                                background:
                                  "linear-gradient(white, white) padding-box, linear-gradient(to right, hsl(249, 99%, 64%), hsl(278, 94%, 30%)) border-box",
                                padding: "2px",
                              },
                            },
                          },

                          "& input": {
                            padding: ".65rem 1.25rem",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: cardInfoErrors.cardDateError.year
                              ? "hsl(0, 100%, 66%)"
                              : "hsl(270, 3%, 87%)",
                            zIndex: -1,
                          },
                        }}
                      />
                    </Stack>
                    {(cardInfoErrors.cardDateError.month ||
                      cardInfoErrors.cardDateError.year) && (
                      <Typography
                        variant="caption"
                        color="hsl(0, 100%, 66%)"
                        marginBlockStart=".5rem"
                        display="block"
                      >
                        {cardInfoErrors.cardDateError.month ||
                          cardInfoErrors.cardDateError.year}
                      </Typography>
                    )}
                  </Box>
                  <Box flex={1}>
                    <Typography
                      variant="button"
                      component="label"
                      htmlFor="card-cvc"
                      fontSize={{ xs: ".78rem", md: "0.875rem" }}
                      display="block"
                      marginBlockEnd=".35rem"
                      color="hsl(278, 68%, 11%)"
                      letterSpacing="2px"
                    >
                      CVC
                    </Typography>
                    <TextField
                      variant="outlined"
                      id="card-cvc"
                      placeholder="e.g. 123"
                      value={cardInfo.cardCvc}
                      onChange={(e) => handleChange(e, "cardCvc")}
                      fullWidth
                      sx={{
                        "& .MuiInputBase-root": {
                          fontSize: "18px",
                          color: "hsl(278, 68%, 11%)",
                          caretColor: "hsl(278, 68%, 11%)",
                          borderRadius: "8px",
                          height: "46px",
                          "&:not(.Mui-focused):hover": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: cardInfoErrors.cardCvcError
                                ? "hsl(0, 100%, 66%)"
                                : "hsl(212, 12%, 71%)",
                            },
                          },
                          "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "1px solid transparent",
                              background:
                                "linear-gradient(white, white) padding-box, linear-gradient(to right, hsl(249, 99%, 64%), hsl(278, 94%, 30%)) border-box",
                              padding: "2px",
                            },
                          },
                        },

                        "& input": {
                          padding: ".65rem 1.25rem",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: cardInfoErrors.cardCvcError
                            ? "hsl(0, 100%, 66%)"
                            : "hsl(270, 3%, 87%)",
                          zIndex: -1,
                        },
                      }}
                    />
                    {cardInfoErrors.cardCvcError && (
                      <Typography
                        variant="caption"
                        color="hsl(0, 100%, 66%)"
                        marginBlockStart=".5rem"
                        display="block"
                      >
                        {cardInfoErrors.cardCvcError}
                      </Typography>
                    )}
                  </Box>
                </Stack>
                <Button
                  type="submit"
                  fullWidth
                  disableRipple
                  onClick={handleSubmit}
                  sx={{
                    textTransform: "none",
                    backgroundColor: "hsl(278, 68%, 11%)",
                    color: "white",
                    height: "54px",
                    borderRadius: ".5rem",
                    fontSize: "16px",
                    marginBlock: { xs: "1.5rem 2.13rem", md: "2.5rem 0" },
                    "&:hover": {
                      outline: "2px solid hsl(278, 68%, 11%)",
                      outlineOffset: "2px",
                    },
                    "&.Mui-focusVisible": {
                      outline: "2px solid hsl(278, 68%, 11%)",
                      outlineOffset: "2px",
                    },
                  }}
                >
                  Confirm
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
