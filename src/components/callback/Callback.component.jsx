import React from 'react';
import {Navigate} from "react-router-dom";


function Callback() {
  return <Navigate to={"/app"} state={{from: window.location.pathname}}/>;
}

export default Callback;
