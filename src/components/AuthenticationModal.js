import React, { useState, useContext } from 'react';

import { Context as GlobalContext } from '../context/GlobalContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const AuthenticationModal = () => {
  const { state: { userAuth } } = useContext(GlobalContext);

  const [showLogin, setShowLogin] = useState(true);

  if (userAuth) return null;
  
  return (
    <>
      {showLogin
        ? <LoginScreen navigateRegister={() => setShowLogin(false)} />
        : <RegisterScreen navigateLogin={() => setShowLogin(true)} />
      }
    </>
  );
};

export default AuthenticationModal;