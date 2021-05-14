import React from 'react';
import { Link } from 'react-router-dom';
import Large from '../button/large';
import './style.scss';

const Home = () => {

  return (
    <div className="home">
      <Link to={'/register'}><Large text={'Create New Wallet'} path={'/register'} /></Link>
      <Link to={'/login'}><Large text={'Access My Wallet'} path={'/login'} /></Link>
      <Link to={'/explorer'}><Large text={'Go to Blockchain Explorer'} /></Link>
    </div>
  );
};

export default Home;