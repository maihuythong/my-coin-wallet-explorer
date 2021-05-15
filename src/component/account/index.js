import React, { useState, useEffect } from 'react';
import './style.scss';
import walletApi from '../../api/walletApi';
import { useHistory } from 'react-router-dom';
import { Tabs } from 'antd';
import Balance from '../balance';
import Transaction from '../transaction';

const { TabPane } = Tabs;

const Account = (props) => {
  let history = useHistory();

  return (
    <div className="account">
      <Balance />
    </div>
  );
};

export default Account;
