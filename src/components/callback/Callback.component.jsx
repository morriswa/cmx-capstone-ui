import React from 'react';
import {Navigate} from "react-router-dom";


function Callback() {
  /*
    const {isLoading, permissions} = usePermissions();

    if (isLoading)
      return <PageLoader/>
    if (!permissions.includes('cmx-capstone:verified_user'))
      return <Navigate to={'/'} state={{from: window.location.pathname}}/>;
    else
      return <Navigate to={'/'} state={{from: window.location.pathname}}/>;
   */

  return <Navigate to={'/'} state={{from: window.location.pathname}}/>;
}

export default Callback;
