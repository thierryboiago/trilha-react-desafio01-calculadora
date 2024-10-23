import Input from "./components/Input";
import Button from "./components/Button";

import { Container, Content, Row } from "./styles";
import { useState, useEffect } from "react";

const App = () => {
  const [currentNumber, setCurrentNumber] = useState("0");
  const [currentLogic, setcurrentLogic] = useState("");
  const [firstNumber, setFirstNumber] = useState("0");

  const [secondNumber, setSecondNumber] = useState("0");

  const [currentOperation, setOperation] = useState("");

  const handleOnClear = () => {
    setCurrentNumber("0");
    setFirstNumber("0");
    setSecondNumber("0");
    setOperation("");
    setcurrentLogic("");
  };

  useEffect(() => {
    calculate();
    if (firstNumber !== "0" && secondNumber === "0") {
      setcurrentLogic(firstNumber + " " + currentOperation);
      setCurrentNumber("0");
    }
  }, [firstNumber, secondNumber]);

  const handleAddNumber = (num) => {
    if(firstNumber !== "0" && secondNumber !== "0" && currentOperation !== ""){
      handleOnClear();
    }
    setCurrentNumber((prev) => `${prev === "0" || prev === "00" ? "" : prev}${num}`);
  };

  const handleOperation = (operation) => {
    if (currentOperation === "") {
      setOperation(operation);
      if (firstNumber === "0") {
        setFirstNumber(String(currentNumber));
      } else if (firstNumber === "0") {
        setSecondNumber(String(currentNumber));
      } else {
        setFirstNumber(String(currentNumber));
        setSecondNumber("0");
      }
    } else {
      if (firstNumber !== "0" && secondNumber !== "0") {
        setOperation(operation);
        setFirstNumber(String(currentNumber));
        setSecondNumber("0");
      }
    }
  };

  const calculate = () => {
    if (
      firstNumber !== "0" &&
      secondNumber !== "0" &&
      currentOperation !== ""
    ) {
      switch (currentOperation) {
        case "+":
          setCurrentNumber(String(Number(firstNumber) + Number(secondNumber)));
          break;
        case "-":
          setCurrentNumber(String(Number(firstNumber) - Number(secondNumber)));

          break;
        case "*":
          setCurrentNumber(String(Number(firstNumber) * Number(secondNumber)));
          break;
        case "/":
          setCurrentNumber(String(Number(firstNumber) / Number(secondNumber)));
          break;
        default:
          break;
      }

      setcurrentLogic(
        firstNumber + " " + currentOperation + " " + secondNumber + " = "
      );
    }
  };

  const handleEquals = () => {
    if (secondNumber === "0") {
      setSecondNumber(String(currentNumber));
    } else {
      setFirstNumber(String(currentNumber));
    }
  };

  return (
    <Container>
      <Content>
        <Input value={currentLogic} />
        <Input value={currentNumber} />
        <Row>
          <Button label="x" onClick={() => handleOperation("*")} />
          <Button label="/" onClick={() => handleOperation("/")} />
          <Button label="c" onClick={handleOnClear} />
          <Button label="." />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber("7")} />
          <Button label="8" onClick={() => handleAddNumber("8")} />
          <Button label="9" onClick={() => handleAddNumber("9")} />
          <Button label="-" onClick={() => handleOperation("-")} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber("4")} />
          <Button label="5" onClick={() => handleAddNumber("5")} />
          <Button label="6" onClick={() => handleAddNumber("6")} />
          <Button label="+" onClick={() => handleOperation("+")} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber("1")} />
          <Button label="2" onClick={() => handleAddNumber("2")} />
          <Button label="3" onClick={() => handleAddNumber("3")} />
          <Button label="=" onClick={handleEquals} />
        </Row>

        <Row>
          <Button label="00" onClick={() => handleAddNumber("00")} />
          <Button label="0" onClick={() => handleAddNumber("0")} />
          <Button label="." onClick={() => handleAddNumber(".")} />
          <Button label="=" onClick={handleEquals} />
        </Row>
      </Content>
    </Container>
  );
};

export default App;
