import {
  KeyOutlined
} from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import authApi from '../../../api/authApi';
import walletApi from '../../../api/walletApi';
import './style.scss';

const Success = (props) => {
  let history = useHistory();
  const [walletId, setWalletId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState('');

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
  }, [])

  useEffect(() => {
    if (walletId) getAddress();
  }, [walletId])

  useEffect(() => {
    if (address) history.push('/account');
  }, [address]);

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
      <div className='wallet-id'>
        <div className='text'>
          Your wallet id:
      </div>
        <input type='text' value={walletId} className='ip' />
      </div>
      <div className='form-create'>

        <div className='text'>Please new address to manipulation</div>


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

        <div className='address'>
          <span>Your new address:</span>
          <input className='ip' type='text' value={address} />
        </div>
      </div>
    </div>
  );
};

export default Success;
