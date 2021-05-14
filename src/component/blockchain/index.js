import { notification, Table } from 'antd';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import React, { useEffect, useState } from 'react';
import EllipsisText from "react-ellipsis-text";
import explorerApi from '../../api/explorerApi';
import './style.scss';

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message
  });
};

const Blockchain = (props) => {
  const [data, setData] = useState([]);
  const timeAgo = new TimeAgo('en-US')

  const getBlockchain = async () => {
    try {
      const response = await explorerApi.getBlockchain();
      if (response.err === '400') {
      } else {
        filterData(response);
      }
    } catch (e) {
      openNotificationWithIcon('error', e.message);
    }
  }

  const filterData = async (data) => {
    let res = [];
    const ret = await data.map(el => {
      let element;
      element = { index: el.index, previousHash: el.previousHash, nonce: el.nonce };
      element.timestamp = timeAgo.format(new Date(el?.timestamp * 1000 ?? null));
      element.reward = el?.transactions[0]?.data?.outputs[0]?.amount ?? null;

      res.unshift(element);
    });

    if (res.length != 0) setData(res);
  }

  useEffect(() => {
    getBlockchain();
  }, [data])

  const columns = [
    {
      title: 'Index',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
    },
    {
      title: 'Nonce',
      dataIndex: 'nonce',
      key: 'nonce',
      align: 'center',
    },
    {
      title: 'Time',
      key: 'timestamp',
      dataIndex: 'timestamp',
      align: 'center',
    },
    {
      title: 'Previous hash',
      key: 'previousHash',
      dataIndex: 'previousHash',
      align: 'center',
      render: previousHash => <EllipsisText text={previousHash} length={"40"} />
    },
    {
      title: 'Reward',
      key: 'reward',
      dataIndex: 'reward',
      align: 'center',
    },
  ];

  return (
    <div className='transaction'>
      <Table columns={columns} dataSource={data} align={'center'} />
    </div>
  );
};

export default Blockchain;
