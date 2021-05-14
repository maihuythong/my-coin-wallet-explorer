import { Tabs } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Blockchain from '../blockchain';
import Transaction from '../transaction';
import './style.scss';

const { TabPane } = Tabs;

const Explorer = (props) => {

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="BLOCKCHAIN" key="1">
        <Blockchain />
      </TabPane>
      <TabPane tab="TRANSACTIONS" key="2">
        <Transaction />
      </TabPane>
    </Tabs>
  );
};

export default Explorer;
