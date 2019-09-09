import React, { useContext } from "react";
import AuthContext from "../auth-context";

const Auth = () => {
  const auth = useContext(AuthContext);

  return <button onClick={auth.login}>Login</button>;
};

export default Auth;
