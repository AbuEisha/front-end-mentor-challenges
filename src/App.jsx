import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Big from "big.js";

const digits = [
  { value: "7", label: "Number Seven", type: "digit" },
  { value: "8", label: "Number Eight", type: "digit" },
  { value: "9", label: "Number Nine", type: "digit" },
  { value: "Del", label: "Delete One Digit", type: "del" },
  { value: "4", label: "Number Four", type: "digit" },
  { value: "5", label: "Number Five", type: "digit" },
  { value: "6", label: "Number Six", type: "digit" },
  { value: "+", label: "Plus Sign", type: "sign" },
  { value: "1", label: "Number One", type: "digit" },
  { value: "2", label: "Number Two", type: "digit" },
  { value: "3", label: "Number Three", type: "digit" },
  { value: "-", label: "Minus Sign", type: "sign" },
  { value: ".", label: "Decimal Point", type: "digit" },
  { value: "0", label: "Number Zero", type: "digit" },
  { value: "/", label: "Division Sign", type: "sign" },
  { value: "x", label: "Multiplication Sign", type: "sign" },
];

function App() {
  const [theme, setTheme] = useState("theme-1");
  const [displayValue, setDisplayValue] = useState("0");
  const [calcElements, setCalcElements] = useState({
    firstNumber: "0",
    operator: null,
    secondNumber: null,
    equal: null,
  });

  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.focus();
    }
  }, []);

  useEffect(() => {
    function getTheme() {
      setTheme(localStorage.getItem("theme") || "theme-1");
    }
    getTheme();
  }, []);

  const handleChangeTheme = (them) => {
    localStorage.setItem("theme", them);
    setTheme(them);
  };

  const formatForDisplay = (str) => {
    const number = parseFloat(str);
    if (isNaN(number)) return str;

    const formatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 20,
    });

    let formatted = formatter.format(number);

    if (str.endsWith(".") && !formatted.includes(".")) {
      formatted += ".";
    }
    return formatted;
  };

  const addAfterEqual = (value) => {
    setDisplayValue(value);
    setCalcElements({
      firstNumber: value,
      operator: null,
      secondNumber: null,
      equal: null,
    });
  };

  const addOneValue = (value, number) => {
    setDisplayValue(value);
    setCalcElements((prev) => ({ ...prev, [number]: value }));
  };

  const addMoreValue = (value, number) => {
    setDisplayValue((prev) => prev + value);
    setCalcElements((prev) => ({ ...prev, [number]: prev[number] + value }));
  };

  const handleUpdateDisplayValue = (value) => {
    switch (value) {
      case ".": {
        if (calcElements.equal === "clicked") {
          addAfterEqual("0.");
        } else if (displayValue === "Can't divide by zero") {
          addAfterEqual("0.");
        } else if (!calcElements.operator && !calcElements.firstNumber) {
          addOneValue("0.", "firstNumber");
        } else if (!calcElements.operator && calcElements.firstNumber) {
          if (!calcElements.firstNumber.match(/\./g)) {
            addMoreValue(value, "firstNumber");
          }
        } else if (calcElements.operator && !calcElements.secondNumber) {
          addOneValue("0.", "secondNumber");
        } else if (calcElements.operator && calcElements.secondNumber) {
          if (!calcElements.secondNumber.match(/\./g)) {
            addMoreValue(value, "secondNumber");
          }
        }

        break;
      }
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9": {
        if (calcElements.equal === "clicked") {
          addAfterEqual(value);
        } else if (displayValue === "Can't divide by zero") {
          addAfterEqual(value);
        } else if (
          !calcElements.operator &&
          (!calcElements.firstNumber || calcElements.firstNumber === "0")
        ) {
          addOneValue(value, "firstNumber");
        } else if (
          !calcElements.operator &&
          calcElements.firstNumber &&
          calcElements.firstNumber !== "0"
        ) {
          addMoreValue(value, "firstNumber");
        } else if (
          calcElements.operator &&
          (!calcElements.secondNumber || calcElements.secondNumber === "0")
        ) {
          addOneValue(value, "secondNumber");
        } else if (
          calcElements.operator &&
          calcElements.secondNumber &&
          calcElements.secondNumber !== "0"
        ) {
          addMoreValue(value, "secondNumber");
        }
        break;
      }
      default:
        break;
    }
  };

  const showResult = (result) => {
    const res = result.toString();
    setDisplayValue(res);
    setCalcElements((prev) => ({
      ...prev,
      firstNumber: isNaN(res) ? "0" : res,
      operator: isNaN(res) ? null : prev.operator,
      secondNumber: isNaN(res) ? null : prev.secondNumber,
      equal: "clicked",
    }));
  };

  const handleCalculation = (first, op, second) => {
    const firstNum = new Big(first);
    switch (op) {
      case "+": {
        const result = firstNum.add(second);
        showResult(result);
        break;
      }
      case "-": {
        const result = firstNum.minus(second);
        showResult(result);
        break;
      }
      case "*": {
        const result = firstNum.mul(second);
        showResult(result);
        break;
      }
      case "/": {
        const result =
          second !== "0" ? firstNum.div(second) : "Can't divide by zero";
        showResult(result);
        break;
      }
      default:
        break;
    }
  };

  const handleAddOperator = (first, op, second) => {
    if (first && calcElements.operator && second) {
      if (!calcElements.equal) {
        handleCalculation(first, calcElements.operator, second);
        setCalcElements((prev) => ({
          ...prev,
          operator: op,
          secondNumber: null,
          equal: null,
        }));
      } else {
        setCalcElements((prev) => ({
          ...prev,
          operator: op,
          secondNumber: null,
          equal: null,
        }));
      }
    } else if (first) setCalcElements((prev) => ({ ...prev, operator: op }));
  };

  const handleCalcEqual = () => {
    if (!calcElements.operator) {
      setDisplayValue(calcElements.firstNumber);
      setCalcElements((prev) => ({ ...prev, equal: "clicked" }));
    } else if (calcElements.operator && !calcElements.secondNumber) {
      setCalcElements((prev) => ({
        ...prev,
        secondNumber: prev.firstNumber,
      }));
      handleCalculation(
        calcElements.firstNumber,
        calcElements.operator,
        calcElements.firstNumber,
      );
    } else if (calcElements.operator && calcElements.secondNumber) {
      handleCalculation(
        calcElements.firstNumber,
        calcElements.operator,
        calcElements.secondNumber,
      );
    }
  };

  const deleteOneDigit = (number) => {
    if (!calcElements[number] || calcElements[number].length === 1) {
      setDisplayValue("0");
      setCalcElements((prev) => ({ ...prev, [number]: "0" }));
    } else {
      setDisplayValue((prev) => prev.slice(0, prev.length - 1));
      setCalcElements((prev) => ({
        ...prev,
        [number]: prev[number].slice(0, prev[number].length - 1),
      }));
    }
  };

  const handleDeleteOne = () => {
    if (isNaN(displayValue)) {
      addAfterEqual("0");
      return;
    }
    if (!calcElements.equal) {
      if (!calcElements.operator) {
        deleteOneDigit("firstNumber");
      } else {
        deleteOneDigit("secondNumber");
      }
    } else {
      setDisplayValue(calcElements.firstNumber);
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case ".":
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9": {
        handleUpdateDisplayValue(e.key);
        break;
      }
      case "+":
      case "-":
      case "*":
      case "/": {
        handleAddOperator(
          calcElements.firstNumber,
          e.key,
          calcElements.secondNumber,
        );
        break;
      }
      case "Enter": {
        e.preventDefault();
        handleCalcEqual();
        break;
      }
      case "Backspace": {
        handleDeleteOne();
        break;
      }
      default:
        break;
    }
  };

  return (
    <Box
      ref={mainRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      component="main"
      className={theme}
      sx={{
        minHeight: "100vh",
        backgroundColor: "var(--main-background)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:focus": { outline: "none" },
      }}
    >
      <Container
        sx={{ maxWidth: { sm: 540 }, paddingInline: { xs: 3, sm: 0 } }}
      >
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Typography
            variant="h1"
            fontSize="2rem"
            color="var(--text-color)"
            paddingInlineStart={1}
          >
            calc
          </Typography>
          <Stack flexDirection="row" alignItems="flex-end" gap={3.5}>
            <Typography
              variant="body1"
              fontSize=".75rem"
              letterSpacing="1px"
              color="var(--text-color)"
              textTransform="uppercase"
            >
              Theme
            </Typography>
            <Box>
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                paddingInline="12px"
                marginBlockEnd={0.25}
              >
                <Typography
                  variant="body1"
                  fontSize=".75rem"
                  color="var(--text-color)"
                >
                  1
                </Typography>
                <Typography
                  variant="body1"
                  fontSize=".75rem"
                  color="var(--text-color)"
                >
                  2
                </Typography>
                <Typography
                  variant="body1"
                  fontSize=".75rem"
                  color="var(--text-color)"
                >
                  3
                </Typography>
              </Stack>
              <Stack
                flexDirection="row"
                position="relative"
                sx={{
                  width: "72px",
                  height: "26px",
                  padding: "5px 6px",
                  borderRadius: "20px",
                  backgroundColor: "var(--keypad-background)",
                  "&:hover": {
                    "&>span": {
                      backgroundColor: "var(--equal-key-hover)",
                    },
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    position: "absolute",
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: "var(--equal-key-background)",
                    top: "5px",
                    left: "6px",
                    zIndex: "2",
                    cursor: "pointer",
                    transform: "var(--toggle-transform)",
                    transition: "all .3s",
                  }}
                ></Box>
                <Button
                  aria-label="Theme One"
                  disableRipple
                  fullWidth
                  sx={{ minWidth: 0 }}
                  onClick={() => handleChangeTheme("theme-1")}
                ></Button>
                <Button
                  aria-label="Theme Two"
                  disableRipple
                  fullWidth
                  sx={{ minWidth: 0 }}
                  onClick={() => handleChangeTheme("theme-2")}
                ></Button>
                <Button
                  aria-label="Theme Three"
                  disableRipple
                  fullWidth
                  sx={{ minWidth: 0 }}
                  onClick={() => handleChangeTheme("theme-3")}
                ></Button>
              </Stack>
            </Box>
          </Stack>
        </Stack>
        <Typography
          variant="h2"
          fontSize={{ xs: "2.4rem", sm: "3.4rem" }}
          fontWeight={700}
          sx={{
            height: { xs: 90, sm: 130 },
            textAlign: "end",
            padding: { xs: "24px", sm: "34px 31px" },
            borderRadius: "8px",
            marginBlock: "2rem 1.5rem",
            backgroundColor: "var(--screan-background)",
            color: "var(--text-color)",
          }}
        >
          {formatForDisplay(displayValue)}
        </Typography>
        <Box
          component="section"
          padding={{ xs: "25px 25px 29px", sm: "32px 30px 36px" }}
          borderRadius="8px"
          sx={{ backgroundColor: "var(--keypad-background)" }}
        >
          <Grid
            container
            rowSpacing={{ xs: 2, sm: 3.5 }}
            columnSpacing={{ xs: 1.5, sm: 3 }}
          >
            {digits.map((digit) => (
              <Grid key={digit.label} size={3}>
                <Button
                  onClick={
                    digit.type === "digit"
                      ? () => handleUpdateDisplayValue(digit.value)
                      : digit.type === "sign"
                        ? () =>
                            handleAddOperator(
                              calcElements.firstNumber,
                              digit.value === "x" ? "*" : digit.value,
                              calcElements.secondNumber,
                            )
                        : handleDeleteOne
                  }
                  aria-label={digit.label}
                  disableRipple
                  fullWidth
                  sx={{
                    minWidth: 0,
                    height: "64px",
                    borderRadius: "8px",
                    backgroundColor:
                      digit.type === "del"
                        ? "var(--delete-key-background)"
                        : "var(--key-background)",
                    lineHeight: 1,
                    boxShadow: `0px 4px 0 ${digit.type === "del" ? "var(--delete-key-shadow)" : "var(--key-shadow)"}`,
                    "&:hover": {
                      backgroundColor:
                        digit.type === "del"
                          ? "var(--delete-key-hover)"
                          : "var(--key-hover)",
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor:
                        digit.type === "del"
                          ? "var(--delete-key-hover)"
                          : "var(--key-hover)",
                    },
                  }}
                >
                  <Typography
                    variant="button"
                    fontSize={
                      digit.type === "del"
                        ? { xs: "20px", sm: "28px" }
                        : { xs: "32px", sm: "40px" }
                    }
                    fontWeight={700}
                    textTransform={digit.type === "del" ? "uppercase" : "none"}
                    color={
                      digit.type === "del"
                        ? "var(--delete-key-text-color)"
                        : "var(--key-text-color)"
                    }
                    lineHeight={1}
                    marginBlockStart="8px"
                  >
                    {digit.value}
                  </Typography>
                </Button>
              </Grid>
            ))}

            <Grid size={6}>
              <Button
                onClick={() => addAfterEqual("0")}
                aria-label="Reset Calculation"
                disableRipple
                fullWidth
                sx={{
                  height: "64px",
                  borderRadius: "8px",
                  backgroundColor: "var(--delete-key-background)",
                  lineHeight: 1,
                  boxShadow: "0px 4px 0 var(--delete-key-shadow)",
                  "&:hover": {
                    backgroundColor: "var(--delete-key-hover)",
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "var(--delete-key-hover)",
                  },
                }}
              >
                <Typography
                  variant="button"
                  fontSize={{ xs: "20px", sm: "28px" }}
                  fontWeight={700}
                  color="var(--delete-key-text-color)"
                  lineHeight={1}
                  marginBlockStart="4px"
                >
                  Reset
                </Typography>
              </Button>
            </Grid>
            <Grid size={6}>
              <Button
                onClick={handleCalcEqual}
                aria-label="Equal Sign"
                disableRipple
                fullWidth
                sx={{
                  height: "64px",
                  borderRadius: "8px",
                  backgroundColor: "var(--equal-key-background)",
                  lineHeight: 1,
                  boxShadow: "0px 4px 0 var(--equal-key-shadow)",
                  "&:hover": {
                    backgroundColor: "var(--equal-key-hover)",
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "var(--equal-key-hover)",
                  },
                }}
              >
                <Typography
                  variant="button"
                  fontSize={{ xs: "20px", sm: "28px" }}
                  fontWeight={700}
                  color="var(--equal-key-text-color)"
                  lineHeight={1}
                  marginBlockStart="4px"
                >
                  =
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
