import React, { useState, useEffect } from 'react';
import './style.scss';
import { useHistory } from 'react-router-dom';
import { Tabs } from 'antd';
import Balance from '../balance';
import Transaction from '../transaction';

const { TabPane } = Tabs;

const Explorer = (props) => {
  let history = useHistory();

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="BLOCKCHAIN" key="1">
        <Balance />
      </TabPane>
      <TabPane tab="TRANSACTIONS" key="2">
        <Transaction />
      </TabPane>
    </Tabs>
  );
};

export default Explorer;
