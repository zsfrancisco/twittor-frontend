import React, { useState } from 'react';
import SignInSignUp from './page/SignInSignUp';

export default function App() {

  const [user, setUser] = useState("null");

  return <div> {user ?
    <div>
      <SignInSignUp />
    </div> : <h1>No estás logueado</h1>}</div>;

}
