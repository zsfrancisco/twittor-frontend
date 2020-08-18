import React, { useState, useEffect } from 'react';
import SignInSignUp from './page/SignInSignUp';
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./utils/contexts";
import { isUserLoggedInApi } from "./api/auth";

export default function App() {

  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

  useEffect(() => {
    setUser(isUserLoggedInApi());
    setRefreshCheckLogin(false);
    setLoadUser(true);
  }, [refreshCheckLogin]);

  if (!loadUser) return null;

  return (
    <AuthContext.Provider value={user}>
      {user ? <h1>Estás logueado</h1> : <div><SignInSignUp setRefreshCheckLogin={setRefreshCheckLogin} /></div>}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );

}
