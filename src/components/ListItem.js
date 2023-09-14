import React from 'react';
import pencilIcon from '../assets/icons/pencil.png';
import removeIcon from '../assets/icons/trash.png';

function ListItem({ data, onEdit, onRemove }) {
  return (
    <div className='Block' key={data.id}>
      <p className='payEl'>{data.text}</p>
      <p className='costEl'>{data.cost}원</p>
      <div className='buttons'>
        <button onClick={() => onEdit(data.id)}><img src={pencilIcon} alt='pencilIcon' /></button>
        <button onClick={() => onRemove(data.id)}><img src={removeIcon} alt='removeIcon' /></button>
      </div>
    </div>
  );
}

export default ListItem;
