import React, { useState, useEffect } from 'react';
import './App.css';
import List from './components/List';
import Alert from './components/Alert';
import Pagination from './components/Pagination';

function App() {
  const [budgetData, setBudgetData] = useState(() => {
    const localData = localStorage.getItem('budgetData');
    return localData ? JSON.parse(localData) : [];
  });
  const [text, setText] = useState("");
  const [cost, setCost] = useState(0);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editID, setEditID] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    localStorage.setItem('budgetData', JSON.stringify(budgetData));
  }, [budgetData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "" || cost <= 0) {
      setAlertMessage("입력 형식이 올바르지 않습니다.");
      setAlertType("error");
      return;
    }

    if (editID) {
      const editedData = budgetData.map(item => item.id === editID ? { id: editID, text, cost } : item);
      setBudgetData(editedData);
      setEditID(null);
      setText("");
      setCost(0);
      setAlertMessage("항목이 수정되었습니다.");
      setAlertType("warning");
    } else {
      const newBudgetData = {
        id: new Date().getTime().toString(),
        text: text,
        cost: cost,
      };
      setBudgetData(prev => [...prev, newBudgetData]);
      setText("");
      setCost(0);
      setAlertMessage("항목이 추가되었습니다.");
      setAlertType("success");
    }
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleCostChange = (e) => {
    setCost(parseInt(e.target.value, 10));
  };

  const handleClickEdit = (id) => {
    const itemToEdit = budgetData.find(item => item.id === id);
    setText(itemToEdit.text);
    setCost(itemToEdit.cost);
    setEditID(id);
  };

  const handleClickRemove = (id) => {
    const filteredData = budgetData.filter(item => item.id !== id);
    setBudgetData(filteredData);
    setAlertMessage("항목이 삭제되었습니다.");
    setAlertType("error");
  };

  const handleClear = () => {
    setBudgetData([]);
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(budgetData.length / itemsPerPage);

  const currentPagedData = budgetData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalCost = budgetData.reduce((acc, item) => acc + item.cost, 0);

  useEffect(() => {
    if (alertMessage) {
      const timeout = setTimeout(() => {
        setAlertMessage(null);
        setAlertType(null);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [alertMessage]);

  return (
    <div className="container">
      {alertMessage && <Alert message={alertMessage} type={alertType} />}
      <h1>예산 계산기</h1>
      <div className="input-info">
        <form onSubmit={handleSubmit}>
          <div className="pay">
            <p>지출 항목</p>
            <input
              type="text"
              value={text}
              placeholder="지출 항목을 입력하세요."
              onChange={handleTextChange}
            />
          </div>
          <div className="cost">
            <p>비용</p>
            <input
              type="number"
              value={cost}
              onChange={handleCostChange}
              defaultValue={0}
            />
            <input className="submitBtn" type="submit" value={editID ? "수정" : "추가"} />
          </div>
        </form>
        <List budgetData={currentPagedData} onEdit={handleClickEdit} onRemove={handleClickRemove} />
      </div>
      {totalPages !== 0 && <><Pagination currentPage={currentPage} totalPage={totalPages} onChangePage={handlePagination} /><div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button className='clearAllBtn' onClick={handleClear}>모두 지우기</button>
        <div className='totalCostDiv'>총 지출 : {totalCost}원</div>
      </div></>}

    </div>
  );
}

export default App;
