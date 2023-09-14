import React from 'react';

function Pagination({ currentPage, totalPage, onChangePage }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <button disabled={currentPage <= 1} onClick={() => onChangePage(currentPage - 1)}>이전</button>
      <span style={{ margin: '0 10px' }}>{currentPage}/{totalPage}</span>
      <button disabled={currentPage >= totalPage} onClick={() => onChangePage(currentPage + 1)}>다음</button>
    </div>
  );
}

export default Pagination;
