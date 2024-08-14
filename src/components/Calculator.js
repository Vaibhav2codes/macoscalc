import React, { useState, useEffect } from 'react';
import Button from './Button';
import Display from './Display';

const evaluateExpression = (expression) => {
    try {
      // Replace square root symbol with Math.sqrt function
      expression = expression.replace(/√/g, 'Math.sqrt');
      // Replace percentage symbol with division by 100
      expression = expression.replace(/%/g, '/100');
      // Use Function constructor as a safer alternative to eval
      return new Function('return ' + expression)();
    } catch {
      return 'Error';
    }
  };

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        setResult(evaluateExpression(input));
      } catch (e) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === 'CE') {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };
  const handleKeyDown = (event) => {
    const { key } = event;
    if (!isNaN(key) || ['+', '-', '*', '/', '%', '.', 'Enter', 'Backspace'].includes(key)) {
      if (key === 'Enter') {
        handleButtonClick('=');
      } else if (key === 'Backspace') {
        handleButtonClick('CE');
      } else {
        handleButtonClick(key);
      }
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input]);

  return (
    <div className="calculator">
      <Display value={result || input || '0'} />
      <div className="buttons">
        <Button onClick={() => handleButtonClick('7')}>7</Button>
        <Button onClick={() => handleButtonClick('8')}>8</Button>
        <Button onClick={() => handleButtonClick('9')}>9</Button>
        <Button onClick={() => handleButtonClick('/')}>/</Button>
        <Button onClick={() => handleButtonClick('4')}>4</Button>
        <Button onClick={() => handleButtonClick('5')}>5</Button>
        <Button onClick={() => handleButtonClick('6')}>6</Button>
        <Button onClick={() => handleButtonClick('*')}>*</Button>
        <Button onClick={() => handleButtonClick('1')}>1</Button>
        <Button onClick={() => handleButtonClick('2')}>2</Button>
        <Button onClick={() => handleButtonClick('3')}>3</Button>
        <Button onClick={() => handleButtonClick('-')}>-</Button>
        <Button onClick={() => handleButtonClick('0')}>0</Button>
        <Button onClick={() => handleButtonClick('.')}>.</Button>
        <Button onClick={() => handleButtonClick('=')}>=</Button>
        <Button onClick={() => handleButtonClick('+')}>+</Button>
        <Button onClick={() => handleButtonClick('C')} className="clear">C</Button>
        <Button onClick={() => handleButtonClick('CE')} className="clear">CE</Button>
        <Button onClick={() => handleButtonClick('%')}>%</Button>
        <Button onClick={() => handleButtonClick('√')}>√</Button>
      </div>
    </div>
  );
};

export default Calculator;
