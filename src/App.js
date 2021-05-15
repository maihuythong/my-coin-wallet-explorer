import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Account from './component/account';
import SignIn from './component/auth/signin';
import RegisterForm from './component/auth/signup';
import Success from './component/auth/success';
import Explorer from './component/explorer';
import HeaderBar from './component/headerBar';
import Home from './component/home';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  const setLoginState = () => {
    setIsLogin(!isLogin);
  };
  return (
    <BrowserRouter>
      <HeaderBar isLogin={isLogin} />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/login'>
          <SignIn setLoginState={setLoginState} />
        </Route>
        <Route exact path='/register'>
          <RegisterForm setLoginState={setLoginState} />
        </Route>
        <Route exact path='/success'>
          <Success />
        </Route>
        <Route exact path='/account'>
          <Account />
        </Route>
        <Route exact path='/explorer'>
          <Explorer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;