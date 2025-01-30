import React from 'react';
import {Navigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import PageLoader from "src/components/page-loader/PageLoader.component.jsx";


function Callback() {
  const {isLoading} = useAuth0();

  // wait for auth0 to finish login process, then redirect to main app
  if (isLoading) return <PageLoader/>;
  return <Navigate to={"/app"} state={{from: window.location.pathname}}/>;
}

export default Callback;
