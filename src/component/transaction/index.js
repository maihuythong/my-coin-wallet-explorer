import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import {
  KeyOutlined,
} from '@ant-design/icons';
import './style.scss';
import walletApi from '../../api/walletApi';
import { useHistory } from 'react-router-dom';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const Transaction = (props) => {
  let history = useHistory();
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [walletId, setWalletId] = useState('');

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  const getAddress = async () => {
    try {
      setIsLoading(true);
      let params = { walletId };
      const response = await walletApi.getAddress(params);
      if (response.err === '400') {
        setIsLoading(false);
      } else {
        if (response?.length != 1) throw new Error("Wallet have no address, please create address before!");
        setAddress(response[0]);
        setIsLoading(false);
      }
    } catch (e) {
      openNotificationWithIcon('error', e.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const wId = localStorage.getItem('walletId');
    if (!wId) { history.push('/') }
    setWalletId(wId);
    getAddress();

  }, [walletId])

  return (
    <div className='account'>
      <div className='balance'>
        <div>
          Your balance: {balance}
        </div>
      </div>
      <div className='address'>
        <div>
          Address: {address}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
