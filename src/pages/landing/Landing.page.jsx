import React, {useEffect} from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";


function Landing() {

  const auth0 = useAuth0();
  const nav = useNavigate();

  useEffect(() => {

    async function effect() {
      if (auth0.isLoading) return;
      if (await auth0.getAccessTokenSilently()) nav("/app");
    }

    effect().then()
  }, [auth0.isLoading])

  async function handleLogin() {
    await auth0.loginWithRedirect();
  }

  if (auth0.isLoading) {
    return (<></>)
  }

  return (
    <div className={"flex-col hfill wfill justify-content-center align-items-center"}>
      <div className={"flex-row gap-1"}>
        <div className={"flex-col"}>
          <h1>Hello KU Student!</h1>
        </div>
        <div className={"flex-col"} style={{width: "300px"}}>
          <button className={"App-button"} onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Landing;
