import React from 'react';
import LoginForm from '../../form/login';
import './style.scss';

const SignIn = (props) => {

  return (
    <div className='register'>
      <LoginForm setLoginState={props.setLoginState} />
    </div>
  );
};

export default SignIn;
