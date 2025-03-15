//Landing page for project

// deps
import {useEffect} from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";

// assets
import BackgroundImage from "$/BackgroundImage.jpg";
import JayhawkImage from "$/KUMarks_Jayhawk.png";

// components
import PageLoader from "src/components/page-loader/PageLoader.component.jsx";


function Landing() {

  // hooks
  const auth0 = useAuth0(); //Auth0 hook to authenticate user
  const nav = useNavigate(); //Navigation hook to navigate between pages

  // effects
  useEffect(() => {

    async function effect() {
      if (auth0.isLoading) return; //if autho0 is loading, do not do anything
      try {
        // get access token silently, reroute if available
        if (await auth0.getAccessTokenSilently()) nav("/app");
      } catch (e) {
        // catch error, expected in most cases... put in debug console and move on
        console.debug('couldnt get token...', e);
      }
    }

    effect().then()
  }, [auth0.isLoading])
  // Function to handle the login
  async function handleLogin() {
    await auth0.loginWithRedirect();
  }
  // If auth0 is loading, show the page loader
  if (auth0.isLoading) return <PageLoader/>

  //Returns the Background Image, Jayhawk Image, JayhawkAI title, and login and sign up buttons
  return (
    <>
      <img src={BackgroundImage} alt={"background"} className={"hfill wfill"} style={{objectFit: "cover", position: "fixed", zIndex: "10"}}/>
      <div className={"flex-col hfill wfill justify-content-center align-items-center"} style={{zIndex: "20"}}>
        <div className={"flex-col gap-2 align-items-center surface-background-color p-2"}>

          <img src={JayhawkImage} alt={"jayhawk logo"} style={{objectFit: "contain", width: "40vw"}}/>

          <div className={"flex-col align-items-center"}>
            <h1>JayhawkAI</h1>
            <h2><i>Your online advisor at the University of Kansas</i></h2>
          </div>

          <div className={"flex-col gap-1 wfill"}>
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
