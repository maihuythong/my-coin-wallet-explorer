import React, { useState, useEffect } from 'react';
import './style.scss';
import { Button, notification, Form, Input } from 'antd';
import {
  KeyOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import authApi from '../../../api/authApi';

const Success = (props) => {
  let history = useHistory();
  const [walletId, setWalletId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState('');

  console.log(walletId);

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  useEffect(() => {
    const wId = localStorage.getItem('walletId');
    if (!wId) { history.push('/') }
    setWalletId(wId);
  }, [])

  const createAddress = async (params) => {
    try {
      params.walletId = walletId;
      setIsLoading(true);
      const response = await authApi.createAddress(params);
      if (response.err === '400') {
        setIsLoading(false);
      } else {
        openNotificationWithIcon('success', 'Address created successfully!');
        const { address } = response;
        setAddress(address);
        setShowAddress(true);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e.response.data.message);
      openNotificationWithIcon('error', e.message);
      setIsLoading(false);
    }
  };

  return (
    <div className='success'>
      <div>
        Register new wallet successfully!
      </div>
      <div className='wallet-id'>
        <div>
          Your wallet id:
      </div>
        <input type='text' value={walletId} className='ip' />
      </div>
      <div>Please new address to manipulation</div>


      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={createAddress}
      >
        <Form.Item
          name='password'
          type='password'
          className='input'
          rules={[
            {
              required: true,
              message: 'Please input your password! Greater than 6 characters',
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
            Create Address
          </Button>

        </Form.Item>
      </Form>

      <div visibility={showAddress ? 'visible' : 'hidden'}>
        <span>Your new address:</span>
        <input type='text' value={address} />
      </div>
    </div>
  );
};

export default Success;
