import "./App.css";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";

import { NumericFormat } from "react-number-format";

import CalculatorIcon from "./assets/images/icon-calculator.svg?react";
import EmptySection from "./assets/images/illustration-empty.svg?react";
import { useState } from "react";
import { styled } from "@mui/material/styles";

const StyledFilledInput = styled(FilledInput)(({ theme, error }) => ({
  fontWeight: 700,
  backgroundColor: "transparent",
  paddingInline: 0,
  border: "1px solid",
  borderColor: error
    ? theme.palette.error.main
    : theme.palette.text.secondary.main,
  height: "52px",
  borderRadius: ".25rem",
  overflow: "hidden",
  "&&::before": {
    borderBlockEnd: "none",
  },
  "& input": {
    paddingBlock: 0,
    paddingInline: "1rem",
  },
  "& input[type='number']": {
    appearance: "textfield",
    "&::-webkit-inner-spin-button": {
      appearance: "none",
    },
    "&::-webkit-outer-spin-button": {
      appearance: "none",
    },
  },
  "&::after": {
    borderBlockEnd: "none",
  },
  "&:hover": {
    backgroundColor: "transparent",
    borderColor: error ? theme.palette.error.main : theme.palette.text.primary,
    "&&::before": {
      borderBlockEnd: "none",
    },
  },
  "&.Mui-focused": {
    borderColor: theme.palette.background.paper,
    backgroundColor: "transparent",
    "& .MuiInputAdornment-root": {
      backgroundColor: theme.palette.background.paper,
    },
    "& p": {
      color: theme.palette.text.primary,
    },
  },
}));

export default function App() {
  const [showResult, setShowResult] = useState(false);
  const [formInputs, setFormInputs] = useState({
    mortgageAmount: "",
    mortgageTerm: "",
    interestRate: "",
    mortgageType: "",
  });

  const [inputsErrors, setInputsErrors] = useState({
    mortgageAmountError: false,
    mortgageTermError: false,
    interestRateError: false,
    mortgageTypeError: false,
  });

  const [mortgageRepayments, setMortgageRepayments] = useState({
    monthlyRepayment: 0,
    totalRepayment: 0,
  });

  const handleChange = (e, valueName) => {
    setFormInputs({ ...formInputs, [valueName]: e.target.value });

    if (inputsErrors[`${valueName}Error`]) {
      setInputsErrors({ ...inputsErrors, [`${valueName}Error`]: false });
    }
  };

  const handleClearAll = (e) => {
    e.preventDefault();
    setFormInputs({
      mortgageAmount: "",
      mortgageTerm: "",
      interestRate: "",
      mortgageType: "",
    });
    setInputsErrors({
      mortgageAmountError: false,
      mortgageTermError: false,
      interestRateError: false,
      mortgageTypeError: false,
    });
    setShowResult(false);
  };

  const calculateMortgage = (amount, term, rate, type) => {
    const principal = parseFloat(amount);
    const years = parseFloat(term);
    const annualRate = parseFloat(rate) / 100;

    if (type === "interestOnly") {
      const monthlyRepay = (principal * annualRate) / 12;
      const totalRepay = monthlyRepay * 12 * years + principal;

      return { monthlyRepayment: monthlyRepay, totalRepayment: totalRepay };
    } else {
      const monthlyRate = annualRate / 12;
      const numberOfPayments = years * 12;

      const monthlyRepay =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
      const totalRepay = monthlyRepay * numberOfPayments;

      return { monthlyRepayment: monthlyRepay, totalRepayment: totalRepay };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrorArr = {
      mortgageAmountError: formInputs.mortgageAmount === "",
      mortgageTermError:
        formInputs.mortgageTerm === "" || formInputs.mortgageTerm <= "0",
      interestRateError:
        formInputs.interestRate === "" || formInputs.interestRate <= "0",
      mortgageTypeError: formInputs.mortgageType === "",
    };

    setInputsErrors(newErrorArr);

    const hasError = Object.values(newErrorArr).some((error) => error);

    if (!hasError) {
      setMortgageRepayments(
        calculateMortgage(
          formInputs.mortgageAmount,
          formInputs.mortgageTerm,
          formInputs.interestRate,
          formInputs.mortgageType,
        ),
      );
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  };
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "background.default",
      }}
    >
      <Container
        sx={{
          "&&": { padding: 0 },
          borderRadius: { md: "1.25rem" },
          overflow: "hidden",
          backgroundColor: "white",
          maxWidth: { md: "900px", lg: "1010px" },
        }}
      >
        <Grid container>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="form"
              sx={{ padding: { xs: "2rem 1.5rem", md: "2.5rem" } }}
            >
              <Stack
                direction={{ md: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", md: "center" }}
                rowGap={1.5}
                marginBlockEnd={{ xs: "1.75rem", md: "2.5rem" }}
              >
                <Typography
                  variant="h1"
                  fontSize="1.5rem"
                  fontWeight={700}
                  lineHeight={1}
                  color="text.primary"
                >
                  Mortgage Calculator
                </Typography>
                <Button
                  onClick={handleClearAll}
                  sx={{
                    textTransform: "none",
                    textDecoration: "underLine",
                    color: "text.secondary.main",
                    padding: 0,
                    justifyContent: "flex-start",
                    lineHeight: 1,
                    fontSize: "1rem",
                    "&:hover": {
                      textDecoration: "underLine",
                      color: "text.primary",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  Clear All
                </Button>
              </Stack>

              <Box>
                <InputLabel
                  htmlFor="mortgage-amount"
                  sx={{
                    marginBlockEnd: ".75rem",
                    color: "text.secondary.main",
                  }}
                >
                  Mortgage Amount
                </InputLabel>
                <FormControl fullWidth variant="filled">
                  <NumericFormat
                    customInput={StyledFilledInput}
                    inputMode="numeric"
                    id="mortgage-amount"
                    value={formInputs.mortgageAmount}
                    error={inputsErrors.mortgageAmountError}
                    onValueChange={(values) => {
                      setFormInputs({
                        ...formInputs,
                        mortgageAmount: values.value,
                      });

                      if (inputsErrors.mortgageAmountError) {
                        setInputsErrors({
                          ...inputsErrors,
                          mortgageAmountError: false,
                        });
                      }
                    }}
                    thousandSeparator=","
                    decimalScale={2}
                    allowNegative={false}
                    startAdornment={
                      <InputAdornment
                        position="start"
                        sx={{
                          "&&&&": { marginBlockStart: 0 },
                          marginInline: "0",
                          minHeight: "100%",
                          backgroundColor: inputsErrors.mortgageAmountError
                            ? "error.main"
                            : "background.default",
                          paddingInline: "1.1rem",
                          "& p": {
                            color: inputsErrors.mortgageAmountError
                              ? "white"
                              : "text.secondary.main",
                            fontWeight: 700,
                          },
                        }}
                      >
                        £
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {inputsErrors.mortgageAmountError && (
                  <Typography
                    variant="body2"
                    color="error.main"
                    marginBlockStart=".75rem"
                  >
                    This field is required
                  </Typography>
                )}
              </Box>
              <Stack
                direction={{ md: "row" }}
                spacing="1.25rem"
                rowGap="1.5rem"
                marginBlockStart={{ xs: "1.5rem", md: "1.75rem" }}
              >
                <Box>
                  <InputLabel
                    htmlFor="mortgage-term"
                    sx={{
                      marginBlockEnd: ".75rem",
                      color: "text.secondary.main",
                    }}
                  >
                    Mortgage Term
                  </InputLabel>
                  <FormControl fullWidth variant="filled">
                    <StyledFilledInput
                      type="number"
                      id="mortgage-term"
                      error={inputsErrors.mortgageTermError}
                      value={formInputs.mortgageTerm}
                      onChange={(e) => handleChange(e, "mortgageTerm")}
                      endAdornment={
                        <InputAdornment
                          position="end"
                          sx={{
                            "&&&&": { marginBlockStart: 0 },
                            marginInline: "0",
                            minHeight: "100%",
                            backgroundColor: inputsErrors.mortgageTermError
                              ? "error.main"
                              : "background.default",
                            paddingInline: "1.1rem",
                            "& p": {
                              color: inputsErrors.mortgageTermError
                                ? "white"
                                : "text.secondary.main",
                              fontWeight: 700,
                            },
                          }}
                        >
                          years
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  {inputsErrors.mortgageTermError && (
                    <Typography
                      variant="body2"
                      color="error.main"
                      marginBlockStart=".75rem"
                    >
                      This field is required
                    </Typography>
                  )}
                </Box>
                <Box>
                  <InputLabel
                    htmlFor="interest-rate"
                    sx={{
                      marginBlockEnd: ".75rem",
                      color: "text.secondary.main",
                    }}
                  >
                    Interest Rate
                  </InputLabel>
                  <FormControl fullWidth variant="filled">
                    <StyledFilledInput
                      type="number"
                      id="interest-rate"
                      error={inputsErrors.interestRateError}
                      value={formInputs.interestRate}
                      onChange={(e) => handleChange(e, "interestRate")}
                      endAdornment={
                        <InputAdornment
                          position="end"
                          sx={{
                            "&&&&": { marginBlockStart: 0 },
                            marginInline: "0",
                            minHeight: "100%",
                            backgroundColor: inputsErrors.interestRateError
                              ? "error.main"
                              : "background.default",
                            paddingInline: "1.1rem",
                            "& p": {
                              color: inputsErrors.interestRateError
                                ? "white"
                                : "text.secondary.main",
                              fontWeight: 700,
                            },
                          }}
                        >
                          %
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  {inputsErrors.interestRateError && (
                    <Typography
                      variant="body2"
                      color="error.main"
                      marginBlockStart=".75rem"
                    >
                      This field is required
                    </Typography>
                  )}
                </Box>
              </Stack>

              <FormControl
                fullWidth
                sx={{ marginBlockStart: { xs: "1.5rem", md: "1.75rem" } }}
              >
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  sx={{
                    marginBlockEnd: ".75rem",
                    color: "text.secondary.main",
                    "&.Mui-focused": {
                      color: "text.secondary.main",
                    },
                  }}
                >
                  Mortgage Type
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={formInputs.mortgageType}
                  onChange={(e) => handleChange(e, "mortgageType")}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="repayment"
                    control={<Radio />}
                    label="Repayment"
                    sx={{
                      border: "1px solid",
                      borderColor:
                        formInputs.mortgageType === "repayment"
                          ? "background.paper"
                          : "text.secondary.main",
                      backgroundColor:
                        formInputs.mortgageType === "repayment"
                          ? "hsl(61deg 70% 52% / 10%)"
                          : "transparent",
                      borderRadius: ".25rem",
                      height: "52px",
                      marginInline: 0,
                      "& .MuiTypography-root": {
                        fontWeight: 700,
                        color: "text.primary",
                      },
                      "&:hover": {
                        borderColor: "background.paper",
                      },

                      "& .MuiRadio-root": {
                        paddingInline: "1rem",
                        "&.Mui-checked": {
                          color: "background.paper",
                        },
                      },
                    }}
                  />
                  <FormControlLabel
                    value="interestOnly"
                    control={<Radio />}
                    label="Interest Only"
                    sx={{
                      border: "1px solid",
                      borderColor:
                        formInputs.mortgageType === "interestOnly"
                          ? "background.paper"
                          : "text.secondary.main",
                      backgroundColor:
                        formInputs.mortgageType === "interestOnly"
                          ? "hsl(61deg 70% 52% / 10%)"
                          : "transparent",
                      borderRadius: ".25rem",
                      height: "52px",
                      marginInline: 0,
                      marginBlockStart: ".75rem",
                      "& .MuiTypography-root": {
                        fontWeight: 700,
                        color: "text.primary",
                      },
                      "&:hover": {
                        borderColor: "background.paper",
                      },

                      "& .MuiRadio-root": {
                        paddingInline: "1rem",
                        "&.Mui-checked": {
                          color: "background.paper",
                        },
                      },
                    }}
                  />
                </RadioGroup>
                {inputsErrors.mortgageTypeError && (
                  <Typography
                    variant="body2"
                    color="error.main"
                    marginBlockStart=".75rem"
                  >
                    This field is required
                  </Typography>
                )}
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                startIcon={<CalculatorIcon />}
                onClick={handleSubmit}
                sx={{
                  marginBlockStart: { xs: "1.5rem", md: "2.5rem" },
                  height: "52px",
                  backgroundColor: "background.paper",
                  color: "text.primary",
                  borderRadius: "1.75rem",
                  textTransform: "none",
                  width: "315px",
                  maxWidth: "100%",
                  fontSize: "1rem",
                  fontWeight: 700,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "action.hover",
                    boxShadow: "none",
                  },
                  "&.Mui-focusVisible": {
                    boxShadow: "none",
                  },
                }}
              >
                Calculate Repayments
              </Button>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="section"
              sx={{
                backgroundColor: "text.primary",
                height: "100%",
                paddingInline: { xs: "1.5rem", md: "2.5rem" },
                paddingBlock: {
                  xs: showResult ? "1.6rem" : "1.97rem",
                  md: "2.5rem",
                },
                display: "flex",
                alignItems: showResult ? "flex-start" : "center",
                justifyContent: showResult ? "flex-start" : "center",
                textAlign: showResult ? "start" : "center",
                borderRadius: { md: "0 0 0 74px" },
              }}
            >
              {showResult && (
                <Box>
                  <Typography
                    variant="h2"
                    fontSize="1.5rem"
                    fontWeight={700}
                    color="white"
                    marginBlock={{ xs: ".25rem 1.25rem", md: ".25rem 1.5rem" }}
                  >
                    Your results
                  </Typography>
                  <Typography variant="body1" color="text.secondary.light">
                    {`
                      Your results are shown below based on the information you provided. 
                      To adjust the results, edit the form and click “calculate repayments” again.
                    `}
                  </Typography>

                  <Box
                    sx={{
                      backgroundColor: "hsl(202.29deg 55.56% 12.35%)",
                      padding: { xs: "1.25rem", md: "2rem" },
                      borderRadius: ".5rem",
                      color: "text.secondary.light",
                      borderTop: "4px solid",
                      borderTopColor: "background.paper",
                      marginBlockStart: { xs: "1.5rem", md: "2.5rem" },
                    }}
                  >
                    <Typography variant="h3" fontSize="1rem">
                      Your monthly repayments
                    </Typography>
                    <NumericFormat
                      value={mortgageRepayments.monthlyRepayment}
                      displayType="text"
                      thousandSeparator=","
                      decimalScale={2}
                      fixedDecimalScale={true}
                      prefix="£"
                      renderText={(formattedValue) => (
                        <Typography
                          variant="h4"
                          fontSize={{ xs: "2.5rem", md: "3.5rem" }}
                          fontWeight={700}
                          color="background.paper"
                          marginBlock={{
                            xs: ".75rem 1.25rem",
                            md: ".75rem 2.25rem",
                          }}
                        >
                          {formattedValue}
                        </Typography>
                      )}
                    />
                    <Divider sx={{ borderColor: "hsl(202, 55%, 16%)" }} />
                    <Typography
                      variant="h3"
                      fontSize="1rem"
                      marginBlock={{
                        xs: "1.25rem .75rem",
                        md: "2.25rem .75rem",
                      }}
                    >
                      Total you'll repay over the term
                    </Typography>

                    <NumericFormat
                      value={mortgageRepayments.totalRepayment}
                      displayType="text"
                      thousandSeparator=","
                      decimalScale={2}
                      fixedDecimalScale={true}
                      prefix="£"
                      renderText={(formattedValue) => (
                        <Typography
                          variant="h4"
                          fontSize="1.5rem"
                          fontWeight={700}
                          color="white"
                        >
                          {formattedValue}
                        </Typography>
                      )}
                    />
                  </Box>
                </Box>
              )}

              {!showResult && (
                <Box>
                  <EmptySection />
                  <Typography
                    variant="h2"
                    fontSize="1.5rem"
                    fontWeight={700}
                    color="white"
                    marginBlock=".52rem 1rem"
                  >
                    Results shown here
                  </Typography>
                  <Typography variant="body1" color="text.secondary.light">
                    {`Complete the form and click “calculate repayments” to see what 
                    your monthly repayments would be.`}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
