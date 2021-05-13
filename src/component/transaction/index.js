import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, notification } from 'antd';
import './style.scss';
import explorerApi from '../../api/explorerApi';
import { useHistory } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import EllipsisText from "react-ellipsis-text";

TimeAgo.addDefaultLocale(en)

const Type = ({ type }) => {
  let color = 'green';
  if (type == 'regular') color = 'green'
  if (type == 'fee') color = 'geekblue'
  if (type == 'reward') color = 'volcano'
  return (
    <Tag color={color} key={type}>
      {type.toUpperCase()}
    </Tag>
  );
};

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message
  });
};

const Transaction = (props) => {
  let history = useHistory();
  const [data, setData] = useState([]);
  const timeAgo = new TimeAgo('en-US')

  const getTransactionsData = async () => {
    try {
      const response = await explorerApi.getTransactions();
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
      element = { txId: el.id, hash: el.hash, type: el.type };
      element.age = timeAgo.format(new Date(el?.time ?? null));
      element.from = el.data.inputs[0].address;
      element.to = el.data.outputs[0].address;
      element.amount = el.data.outputs[0].amount;

      res.unshift(element);
    });

    if (res.length != 0) setData(res);
  }

  useEffect(() => {
    getTransactionsData();
  }, [data])

  const columns = [
    {
      title: 'TxId',
      dataIndex: 'txId',
      key: 'txId',
      align: 'center',
      render: txId => <a><EllipsisText text={txId} length={"40"} /></a>
    },
    {
      title: 'Tx Hash',
      dataIndex: 'hash',
      key: 'hash',
      align: 'center',
      render: hash => <EllipsisText text={hash} length={"40"} />
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      align: 'center',
      render: type => <Type type={type} />
    },
    {
      title: 'Age',
      key: 'age',
      dataIndex: 'age',
      align: 'center',
    },
    {
      title: 'From',
      key: 'from',
      dataIndex: 'from',
      align: 'center',
      render: from => <EllipsisText text={from} length={"40"} />
    },
    {
      title: 'To',
      key: 'to',
      dataIndex: 'to',
      align: 'center',
      render: to => <EllipsisText text={to} length={"40"} />
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
      align: 'center',
    },
  ];

  return (
    <div className='transaction'>
      <Table columns={columns} dataSource={data} align={'center'} />
    </div>
  );
};

export default Transaction;
