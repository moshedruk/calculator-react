import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState<string>("")  // שמירת התוצאה הנוכחית
  const [isResult, setIsResult] = useState<boolean>(false)
  
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
  const operations = ["+", "-", "*", "/"]

  const calculateResult = (expression: string): string => {
    try {
      // נבצע חישוב בטוח על ידי שימוש ב
      // Function constructor
      // נוודא שזאת חישוב חוקי רק אם כל הביטוי מכיל רק מספרים ופעולות חוקיות
      const safeExpression = expression.replace(/[^0-9+\-*/.]/g, "");
      return eval(safeExpression).toString();
    } catch (error) {
      return "Error";  
    }
  }

  const handleClick = (value: string) => {
    if (isResult) {
      // אם התוצאה כבר הוצגה, ננקה את התצוגה
      setDisplay(value);
      setIsResult(false);
    } else {
      // הוספת הערך שנלחץ למסך
      setDisplay(display + value);
    }
  }

  const handleOperation = (operation: string) => {
    setIsResult(false);
    // אם התצוגה כבר מכילה פעולות, לא נוסיף פעולות נוספות
    if (operations.includes(display[display.length - 1])) {
      setDisplay(display.slice(0, -1) + operation);
      
    } else {
      setDisplay(display + operation);
      console.log("ff")
    }
  }

  const handleBackspace = () => {
    setDisplay(display.slice(0, -1));
  }

  const handleClear = () => {
    setDisplay("");
    setIsResult(false);
  }

  const handleEquals = () => {
    if (display !== "") {
      const result = calculateResult(display);
      setDisplay(result);
      setIsResult(true);
    }
  }

  return (
    <>
      <input type="text" value={display} readOnly />
      <div className="card-calculator">
        {numbers.map((number) => (
          <div 
            key={number} 
            className="number" 
            onClick={() => handleClick(number)}
          >
            {number}
          </div>
        ))}
        {operations.map((operation) => (
          <div 
            key={operation} 
            className="operation" 
            onClick={() => handleOperation(operation)}
          >
            {operation}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={handleBackspace}>←</button>
        <button onClick={handleClear}>C</button>
        <button onClick={handleEquals}>=</button>
      </div>
    </>
  );
}

export default App;
