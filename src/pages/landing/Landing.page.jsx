import {useEffect} from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";
import BackgroundImage from "$/BackgroundImage.jpg";


function Landing() {

  const auth0 = useAuth0();
  const nav = useNavigate();

  useEffect(() => {

    async function effect() {
      if (auth0.isLoading) return;
      try {
        if (await auth0.getAccessTokenSilently()) nav("/app");
      } catch (e) {
        console.debug('couldnt get token...', e);
      }
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
    <>
      <img src={BackgroundImage} alt={"background"} className={"hfill wfill"} style={{objectFit: "cover", position: "fixed", zIndex: "10"}}/>
      <div className={"flex-col hfill wfill justify-content-center align-items-center"} style={{zIndex: "20"}}>
        <div className={"flex-row gap-2 align-items-center surface-background-color p-2"}>
          <div className={"flex-col align-items-flex-end"}>
            <h1>JayhawkAI</h1>
            <h2><i>Welcome KU Students!</i></h2>
          </div>
          <div className={"flex-col gap-1"} style={{width: "300px"}}>
            <button className={"App-button"} onClick={handleLogin}>Login</button>
            <button className={"App-button secondary-outline"} onClick={handleLogin}>Sign Up</button>
            {/*<button className={"App-button secondary-outline"}>About Us</button>*/}
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing;
