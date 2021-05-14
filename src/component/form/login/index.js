import {
  KeyOutlined,
  UserOutlined,
  LockOutlined
} from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import authApi from '../../../api/authApi';
import './style.scss';

const RegisterForm = (props) => {
  let history = useHistory();
  const { setLoginState } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [walletId, setWalletId] = useState('');

  const handleSubmit = (values) => {
    handleLogin(values);
  };

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  useEffect(() => {
    let wid = localStorage.getItem('walletId');
    if (wid) {
      openNotificationWithIcon('warning', 'You have already access a wallet');
      history.push('/account');
    }
  }, [walletId])

  const handleLogin = async (params) => {
    try {
      setIsLoading(true);
      const response = await authApi.accessWallet(params);
      console.log(response);
      if (response.code === '401') {
        openNotificationWithIcon('error', response.message);
        setIsLoading(false);
      } else {
        localStorage.setItem('walletId', params.walletId);
        setIsLoading(false);
        setLoginState();
        openNotificationWithIcon('success', 'Access wallet successfully!');
        history.push('/success');
      }
    } catch (e) {
      openNotificationWithIcon('error', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container'>

      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name='walletId'
          rules={[
            {
              required: true,
              message: 'Please input your Wallet ID!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Wallet ID'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
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
            Access
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
