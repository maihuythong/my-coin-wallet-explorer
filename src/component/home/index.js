import React from 'react';
import './style.scss';
import { useHistory } from 'react-router-dom';
import Large from '../button/large';

const Home = (props) => {
  let history = useHistory();

  return (
    <div className="home">
      <Large text={'Create New Wallet'} path={'/register'} />
      <Large text={'Access My Wallet'} />
      <Large text={'Go to Blockchain Explorer'} />
    </div>
  );
};

export default Home;