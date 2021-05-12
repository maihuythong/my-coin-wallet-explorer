import React from 'react';
import './style.scss';
import { useHistory } from 'react-router-dom';

const Large = (props) => {
  let history = useHistory();

  return (
    <div className="btn">
      <div onClick={() => { history.push(props.path) }}>
        <span className="text">{props.text}</span>
      </div>
    </div>
  );
};

export default Large;