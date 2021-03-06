import {
  KeyOutlined,

  MoneyCollectOutlined, UserOutlined
} from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import walletApi from '../../api/walletApi';
import LargeInfo from '../largeinfo';
import './style.scss';


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
        if (response?.length !== 1) {
          history.push('/success');
          throw new Error("Wallet have no address, please create address before!");
        }
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
      console.log(response);
      if (response.status === 202) {
        openNotificationWithIcon('error', response.message);
      }
      else if (response.status === 200) {
        openNotificationWithIcon('error', response.message);
      } else {
        openNotificationWithIcon('success', 'Transaction created successfully!');
        getBalance(address);
      }
    } catch (e) {
      console.log('throw');
      openNotificationWithIcon('error', e.message);
    } finally {
      setIsLoading(false);

    }
  }

  return (
    <div className='account'>
      <div className='wallet-info'>
        <div className='balance'>
          <LargeInfo type='Address' value={address} />
        </div>
        <div className='address'>
          <LargeInfo type='Balance' value={balance} unit='PPC' />
        </div>
      </div>
      <div className='transaction'>
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
