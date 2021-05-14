import React from 'react';
import './style.scss';
import { useHistory } from 'react-router-dom';

const Large = (props) => {
  let history = useHistory();

  return (
    <div onClick={() => { history.push(props.path) }}>
      <div className="btn">
        <span className="text">{props.text}</span>
      </div>
    </div>
  );
};

export default Large;