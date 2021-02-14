import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [displayPrevious, setDisplayPrevious] = useState("");
  const [displayCurrent, setDisplayCurrent] = useState("");
  const [previousOperand, setPreviousOperand] = useState("");
  const [currentOperand, setCurrentOperand] = useState("0");
  const [op, setOp] = useState("");

  useEffect(() => {
    updateDisplay();
  }, [currentOperand]);

  const clear = () => {
    setDisplayPrevious("");
    setDisplayCurrent("");
    setPreviousOperand("");
    setCurrentOperand("0");
    setOp("");
  };

  const backspace = () => {
    if (currentOperand === "0" || currentOperand === "") return;
    setCurrentOperand((prev) => prev.slice(0, -1));
  };

  const handleClick = (num) => () => {
    if (num === "." && currentOperand.includes(".")) return;
    setCurrentOperand((prev) => (prev === "0" ? num : prev + num));
  };

  const operation = (num) => () => {
    let result = undefined;
    if (currentOperand === "") return;
    if (currentOperand !== "") {
      result = compute(); //Se a tela não estiver vazia, usar o sinal vai causar a operação anterior a ser computada;
    }
    setOp(num);
    setPreviousOperand(result ? result : currentOperand); //Se houve resultado anterior, se algo foi calculado, utilizar o cálculo feito e colocar ele em cima, caso contrário, colocar o novo dígito
    setCurrentOperand("");
  };

  function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (op) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    setPreviousOperand("");
    setCurrentOperand(computation.toString());
    setOp("");
    return computation.toString();
  }

  const updateDisplay = () => {
    setDisplayCurrent(currentOperand);
    if (op !== "") {
      setDisplayPrevious(`${previousOperand} ${op}`);
    } else {
      setDisplayPrevious("");
    }
  };

  return (
    <div className="App">
      <h2 id="display2">{displayPrevious}</h2>
      <h2 id="display">{displayCurrent}</h2>
      <button onClick={clear} id="clear">
        AC
      </button>
      <button onClick={backspace} id="del">
        DEL
      </button>
      <button onClick={operation("/")} id="divide">
        /
      </button>
      <button onClick={operation("*")} id="multiply">
        x
      </button>
      <button onClick={handleClick("7")} id="seven">
        7
      </button>
      <button onClick={handleClick("8")} id="eight">
        8
      </button>
      <button onClick={handleClick("9")} id="nine">
        9
      </button>
      <button onClick={operation("-")} id="subtract">
        -
      </button>
      <button onClick={handleClick("4")} id="four">
        4
      </button>
      <button onClick={handleClick("5")} id="five">
        5
      </button>
      <button onClick={handleClick("6")} id="six">
        6
      </button>
      <button onClick={operation("+")} id="add">
        +
      </button>
      <div className="wrapper-parent">
        <div className="wrapper-child-one">
          <button onClick={handleClick("1")} id="one">
            1
          </button>
          <button onClick={handleClick("2")} id="two">
            2
          </button>
          <button onClick={handleClick("3")} id="three">
            3
          </button>
          <button onClick={handleClick("0")} id="zero">
            0
          </button>
          <button onClick={handleClick(".")} id="decimal">
            .
          </button>
        </div>
        <div className="wrapper-child-two">
          <button onClick={() => compute()} id="equals">
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
