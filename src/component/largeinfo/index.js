import React from 'react';
import './style.scss';
import { useHistory } from 'react-router-dom';

const LargeInfo = (props) => {
  let history = useHistory();

  return (
    <div className="info">
      <div className="title">{props.type}</div>
      <div className="value-container">
        <div className="value">{props.value}</div>
        {props.unit ? <div className="unit">{props.unit}</div> : null}

      </div>
    </div>
  );
};

export default LargeInfo;