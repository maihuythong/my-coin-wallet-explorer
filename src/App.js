import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import HeaderBar from './component/headerBar';
import Home from './component/home';
import RegisterForm from './component/auth/signup';
import SignIn from './component/auth/signin';
import Success from './component/auth/success';
import Account from './component/account';
import Explorer from './component/explorer';
// import { QueryParamProvider } from 'use-query-params';
// import SignIn from './components/account/signIn';
// import SignUp from './components/account/signUp';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  const setLoginState = () => {
    setIsLogin(!isLogin);
  };
  return (
    <BrowserRouter>
      <HeaderBar isLogin={isLogin} />
      <Switch>
        {/* <QueryParamProvider> */}
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
        {/* </QueryParamProvider> */}
      </Switch>
    </BrowserRouter>
  );
};

export default App;