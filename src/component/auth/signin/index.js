import React from 'react';
import './style.scss';
import LoginForm from '../../form/login';

const SignIn = (props) => {

  return (
    <div className='register'>
      <LoginForm setLoginState={props.setLoginState} />
    </div>
  );
};

export default SignIn;
