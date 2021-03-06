import { MenuOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Col, Layout, Menu, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';
const { Header, Content } = Layout;

const HeaderBar = (props) => {
  let history = useHistory();

  const [walletId, setWalletId] = useState('');

  useEffect(() => {
    setWalletId(localStorage.getItem('walletId'));
  }, [walletId]);

  useEffect(() => {
    setWalletId(localStorage.getItem('walletId'));
  }, [props.isLogin])

  const logout = () => {
    localStorage.setItem('walletId', '');
    history.push('/');
  }

  return (
    <Row justify='center'>
      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
        <Header className='header-fixed'>
          <Row className='row-menu'>
            <Col>
              <Menu
                theme='dark'
                mode='horizontal'
                defaultSelectedKeys={["Home"]}
                overflowedIndicator={<MenuOutlined />}
              >
                <Menu.Item
                  key="Home"
                  onClick={() => history.push('/')}
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
            <Col>
              <Menu
                mode="horizontal"
                theme="dark"
                style={{ float: 'right' }}
              >
                <Menu.Item
                  key={"Logout"}
                  style={{ float: 'right' }}
                  onClick={() => logout()}
                >
                  <PoweroffOutlined />
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