import React, { useContext } from 'react';
import { Navigate } from "react-router-dom";
import UserContext from '../../utils/context';

const Logout = () => {
  document.cookie = "Bearer= ;";

  const context = useContext(UserContext);
  
  context.user = { userId: "", username: "" };

  return <Navigate to="/" replace />;
};

export default Logout;
