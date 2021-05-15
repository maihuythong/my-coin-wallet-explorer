import React from 'react';
import RegisterForm from '../../form/register';
import './style.scss';

const SignUp = (props) => {

  return (
    <div className='register'>
      <RegisterForm setLoginState={props.setLoginState} />
    </div>
  );
};

export default SignUp;
