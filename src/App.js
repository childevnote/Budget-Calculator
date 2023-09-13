import React, { useState } from "react";
import './App.css';

function App() {

  const [budgetData, setBudgetData] = useState([]);
  const [value, setValue] = useState("");

  return (
    <div className="container">
      <h1>예산 계산기</h1>
      <div className="input-info">
        <div className="pay">
          <p>지출 항목</p>
          <input
            type="text"
          />
        </div>
        <div className="cost">
          <p>비용</p>
          <input
            type="number"
          />
          <input className="submitBtn" type="submit" value="추가" />
        </div>

      </div>
    </div>
  );
}

export default App;
