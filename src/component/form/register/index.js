import {
  KeyOutlined
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
    if (wid) history.push('/account');
  }, [walletId])

  const handleLogin = async (params) => {
    try {
      setIsLoading(true);
      const response = await authApi.createWallet(params);
      if (response.err === '400') {
        setIsLoading(false);
      } else {
        const { id } = response;
        localStorage.setItem('walletId', id);
        setIsLoading(false);
        setLoginState();
        openNotificationWithIcon('success', 'Wallet created');
        history.push('/success');
      }
    } catch (e) {
      openNotificationWithIcon('error', e.message);
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
            Register
          </Button>
          <div>
            Already have wallet?  <a href='/login'>Access now!</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
