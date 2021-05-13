import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import {
  KeyOutlined,
  UserOutlined,
  MoneyCollectOutlined,
  SecurityScanOutlined
} from '@ant-design/icons';

import './style.scss';
import walletApi from '../../api/walletApi';
import { useHistory } from 'react-router-dom';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const Balance = (props) => {
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
        getBalance(response[0]);
      }
    } catch (e) {
      openNotificationWithIcon('error', e.message);
      setIsLoading(false);
    }
  };

  const getBalance = async (addressId) => {
    try {
      setIsLoading(true);
      let params = { addressId };
      const response = await walletApi.getBalance(params);
      if (response.err === '400') {
        setIsLoading(false);
      } else {
        setBalance(response.balance);
        setIsLoading(false);
      }
    } catch (e) {
      setBalance(0);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const wId = localStorage.getItem('walletId');
    if (!wId) { history.push('/') }
    setWalletId(wId);
    if (walletId) getAddress();
  }, [walletId])

  const handleSubmitTransaction = async (params) => {
    try {
      setIsLoading(true);
      params.walletId = walletId;
      if (address) {
        params.fromAddress = address;
      }
      const response = await walletApi.createTransaction(params);
      if (response.err === '400') {
        setIsLoading(false);
      } else {
        setAddress(response[0]);
        setIsLoading(false);
      }
    } catch (e) {
      openNotificationWithIcon('error', e.message);
      setIsLoading(false);
    }
  }

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
      <div className='transaction'>
        <div>Create transaction</div>
        <div className='form'>
          <Form
            name='normal_login'
            className='login-form'
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmitTransaction}
          >
            <Form.Item
              name='toAddress'
              rules={[
                {
                  required: true,
                  message: 'Please type address send to!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='To address'
              />
            </Form.Item>
            <Form.Item
              name='amount'
              rules={[
                {
                  required: true,
                  message: 'Please type amount!',
                },
              ]}
            >
              <Input
                prefix={<MoneyCollectOutlined className='site-form-item-icon' />}
                placeholder='Amount'
              />
            </Form.Item>
            <Form.Item
              name='password'
              type='password'
              className='input'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                  min: 7
                },
              ]}
            >
              <Input.Password
                prefix={<KeyOutlined className='site-form-item-icon' />}
                placeholder='Password'
              />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
                loading={isLoading}
              >
                Create
          </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Balance;
