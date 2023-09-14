import React from 'react';
import ListItem from './ListItem';

function List({ budgetData, onEdit, onRemove }) {
  return (
    <div>
      {budgetData.map((data) => (
        <ListItem key={data.id} data={data} onEdit={onEdit} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default List;
