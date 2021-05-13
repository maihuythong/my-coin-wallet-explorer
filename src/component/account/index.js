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
    <Tabs defaultActiveKey="1">
      <TabPane tab="INFO" key="1">
        <Balance />
      </TabPane>
      <TabPane tab="TRANSACTION" key="2">
        <Transaction />
      </TabPane>
    </Tabs>
  );
};

export default Account;
