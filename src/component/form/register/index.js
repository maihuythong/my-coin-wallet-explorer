import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import {
  KeyOutlined,
} from '@ant-design/icons';
import './style.scss';
import authApi from '../../../api/authApi';
import { useHistory } from 'react-router-dom';

const RegisterForm = () => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values) => {
    handleLogin(values);
  };

  const handleLogin = async (params) => {
    try {
      setIsLoading(true);
      const response = await authApi.createWallet(params);
      if (response.err === '400') {
        setIsLoading(false);
        openNotificationWithIcon(response.message);
      } else {
        const { id } = response;
        localStorage.setItem('walletId', id);
        console.log(id);
        setIsLoading(false);
        history.push('/success');
      }
    } catch (e) {
      openNotificationWithIcon(e.message);
    }
  };

  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Successful!'
    });
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
