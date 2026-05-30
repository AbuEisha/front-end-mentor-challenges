import Big from "big.js";

function addAfterEqual(value) {
  return {
    displayValue: value,
    firstNumber: value,
    operator: null,
    secondNumber: null,
    equal: null,
  };
}

const addOneValue = (obj, value, number) => {
  return { ...obj, displayValue: value, [number]: value };
};

const hasDot = (value) => value.includes(".");

const addMoreValue = (obj, value, number) => {
  return {
    ...obj,
    displayValue: obj.displayValue + value,
    [number]: obj[number] + value,
  };
};

const showResult = (obj, op, result, isClicked = false) => {
  const res = result.toString();

  return {
    displayValue: res,
    firstNumber: isNaN(res) ? "0" : res,
    operator: isNaN(res) ? null : op,
    secondNumber: isNaN(res) || !isClicked ? null : obj.secondNumber,
    equal: isClicked ? "clicked" : null,
  };
};

const handleCalculation = (obj, first, op, second, sign, isClicked) => {
  const firstNum = new Big(first);
  switch (op) {
    case "+": {
      const result = firstNum.add(second);
      return showResult(obj, sign, result, isClicked);
    }
    case "-": {
      const result = firstNum.minus(second);
      return showResult(obj, sign, result, isClicked);
    }
    case "*": {
      const result = firstNum.mul(second);
      return showResult(obj, sign, result, isClicked);
    }
    case "/": {
      const result =
        second !== "0" ? firstNum.div(second) : "Can't divide by zero";
      return showResult(obj, sign, result, isClicked);
    }
    default:
      break;
  }
};

const deleteOneDigit = (obj, number) => {
  if (!obj[number] || obj[number].length === 1) {
    return { ...obj, displayValue: "0", [number]: "0" };
  } else {
    return {
      ...obj,
      displayValue: obj.displayValue.slice(0, obj.displayValue.length - 1),
      [number]: obj[number].slice(0, obj[number].length - 1),
    };
  }
};

export default function calculatorReducer(calcInfo, action) {
  switch (action.type) {
    case "update": {
      switch (action.payload.value) {
        case ".": {
          if (calcInfo.equal === "clicked") {
            return addAfterEqual("0.");
          } else if (calcInfo.displayValue === "Can't divide by zero") {
            return addAfterEqual("0.");
          } else if (!calcInfo.operator && !calcInfo.firstNumber) {
            return addOneValue(calcInfo, "0.", "firstNumber");
          } else if (!calcInfo.operator && calcInfo.firstNumber) {
            if (hasDot(calcInfo.firstNumber)) {
              return calcInfo;
            }
            return addMoreValue(calcInfo, action.payload.value, "firstNumber");
          } else if (calcInfo.operator && !calcInfo.secondNumber) {
            return addOneValue(calcInfo, "0.", "secondNumber");
          } else if (calcInfo.operator && calcInfo.secondNumber) {
            if (hasDot(calcInfo.secondNumber)) {
              return calcInfo;
            }
            return addMoreValue(calcInfo, action.payload.value, "secondNumber");
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
          if (calcInfo.equal === "clicked") {
            return addAfterEqual(action.payload.value);
          } else if (calcInfo.displayValue === "Can't divide by zero") {
            return addAfterEqual(action.payload.value);
          } else if (
            !calcInfo.operator &&
            (!calcInfo.firstNumber || calcInfo.firstNumber === "0")
          ) {
            return addOneValue(calcInfo, action.payload.value, "firstNumber");
          } else if (
            !calcInfo.operator &&
            calcInfo.firstNumber &&
            calcInfo.firstNumber !== "0"
          ) {
            return addMoreValue(calcInfo, action.payload.value, "firstNumber");
          } else if (
            calcInfo.operator &&
            (!calcInfo.secondNumber || calcInfo.secondNumber === "0")
          ) {
            return addOneValue(calcInfo, action.payload.value, "secondNumber");
          } else if (
            calcInfo.operator &&
            calcInfo.secondNumber &&
            calcInfo.secondNumber !== "0"
          ) {
            return addMoreValue(calcInfo, action.payload.value, "secondNumber");
          }
          break;
        }
        default:
          break;
      }
      break;
    }
    case "addingSign": {
      if (calcInfo.firstNumber && calcInfo.operator && calcInfo.secondNumber) {
        if (!calcInfo.equal) {
          return handleCalculation(
            calcInfo,
            calcInfo.firstNumber,
            calcInfo.operator,
            calcInfo.secondNumber,
            action.payload.sign,
          );
        } else
          return {
            ...calcInfo,
            operator: action.payload.sign,
            secondNumber: null,
            equal: null,
          };
      } else if (calcInfo.firstNumber)
        return { ...calcInfo, operator: action.payload.sign };

      break;
    }
    case "equal": {
      if (!calcInfo.operator) {
        return { ...calcInfo, equal: "clicked" };
      }
      const newCalcInfo = {
        ...calcInfo,
        secondNumber: calcInfo.secondNumber
          ? calcInfo.secondNumber
          : calcInfo.firstNumber,
      };
      return handleCalculation(
        newCalcInfo,
        newCalcInfo.firstNumber,
        newCalcInfo.operator,
        newCalcInfo.secondNumber,
        newCalcInfo.operator,
        true,
      );
    }
    case "delete": {
      if (isNaN(calcInfo.displayValue)) {
        return addAfterEqual("0");
      }
      if (!calcInfo.equal) {
        if (!calcInfo.operator) {
          return deleteOneDigit(calcInfo, "firstNumber");
        } else {
          return deleteOneDigit(calcInfo, "secondNumber");
        }
      } else {
        return { ...calcInfo, displayValue: calcInfo.firstNumber };
      }
    }
    case "reset": {
      return addAfterEqual("0");
    }
  }
}
