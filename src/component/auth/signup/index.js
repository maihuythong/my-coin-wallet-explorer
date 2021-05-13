import React from 'react';
import './style.scss';
import RegisterForm from '../../form/register';

const SignUp = (props) => {

  return (
    <div className='register'>
      <RegisterForm setLoginState={props.setLoginState} />
    </div>
  );
};

export default SignUp;
