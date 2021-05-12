import React, { useState, useEffect } from 'react';
import './style.scss';
import { Button, notification } from 'antd';
import { useHistory } from 'react-router-dom';

const Success = (props) => {
  let history = useHistory();
  const [walletId, setWalletId] = useState('');
  console.log(walletId);
  // const openNotificationWithIcon = (type) => {
  //   console.log('call');
  //   notification[type]({
  //     message: 'Successful!'
  //   });
  // };
  useEffect(() => {
    const wId = localStorage.getItem('walletId');
    if (!wId) { history.push('/') }
    setWalletId(wId);
  }, [])

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
      <Button type="primary"
      // onClick={openNotificationWithIcon('success')}
      >
        Create Address
      </Button>,
    </div>
  );
};

export default Success;
