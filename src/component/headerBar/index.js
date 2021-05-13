import React, { useState, useEffect } from 'react';
import './style.scss';
import { Row, Col, Typography, Layout, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
const { Header, Content } = Layout;
const { Title } = Typography;

const HeaderBar = (props) => {
  let history = useHistory();

  const [walletId, setWalletId] = useState('');



  useEffect(() => {
    setWalletId(localStorage.getItem('walletId'));
  }, [walletId]);

  useEffect(() => {
    setWalletId(localStorage.getItem('walletId'));
  }, [props.isLogin])

  return (
    <Row justify='center'>
      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
        <Header className='header-fixed'>
          <Row>
            <Col>
              <Menu
                theme='dark'
                mode='horizontal'
                defaultSelectedKeys={["Home"]}
                overflowedIndicator={<MenuOutlined />}
              >
                <Menu.Item
                  key="Home"
                // onClick={() => gotoPage("item1")}
                >
                  Home
                </Menu.Item>
                <Menu.Item
                  key={"Account"}
                  onClick={() => history.push('/account')}
                // disabled={walletId?.length != 0 ? 'false' : 'true'}
                >
                  Account
                </Menu.Item>
                <Menu.Item
                  key={"Explorer"}
                  onClick={() => history.push('/explorer')}
                >
                  Explorer
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Content>{props.children}</Content>
      </Col>
    </Row>
  );
};

export default HeaderBar;