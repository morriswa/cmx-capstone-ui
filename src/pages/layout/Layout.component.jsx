import './Layout.component.scss';
import {Navigate, Outlet, useNavigation} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import PageLoader from "src/components/page-loader/PageLoader.component.jsx";
import {DEFAULT_LOGOUT} from "src/config/auth0.config.jsx";
import useRestClient from "src/hooks/RestClient.hook.jsx";
import {useQuery} from "@tanstack/react-query";


function SidebarMenu() {
  const auth0 = useAuth0(); //Auth0 hook to authenticate user
  const client = useRestClient(); //Rest client hook to make API calls
  const promptHistoryQ = useQuery({ //Query hook to get the history prompts
    queryKey: ['history'],
    queryFn: async ()=> (await client.getUserPromptHistory()).json()
  })
  //Function to handle the logout 
  async function handleLogout() {
    await auth0.logout(DEFAULT_LOGOUT)
  }
  //Fucntion to handle the profile click
  async function handleProfileClick() {
    return;
  }
  //If the prompt history is loading, show the page loader
  if (promptHistoryQ.isLoading) return <PageLoader />

  const prevPrompts = promptHistoryQ.data; //get the prompt history data
  console.log(prevPrompts); //log the prompt history data

  // TODO potentially flex this, need to extern variables...
  return (<div className={"flex-col justify-content-space-between p-1 alternate-surface-background-color"}>
    {/* Float top menu items*/}
    <div className={"flex-col gap-1"}>
      <h3>JayhawkAI</h3>
      {/*List of previous prompts*/}
      {prevPrompts.map(p =>
        <button className={"App-button"} key={p.chat_id}>
          {p.prompt_text}
        </button>
      )}
    </div>

    {/* Float bottom menu items*/}
    <div className={"flex-col gap-1"}>
      <button className={"App-button secondary-outline"} onClick={handleProfileClick}>Profile</button>
      <button className={"App-button"} onClick={handleLogout}>Logout</button>
    </div>
  </div>)
}

function Layout() {

  const {state} = useNavigation(); //Naviagation hook to get the state of the page
  const auth0 = useAuth0(); //Autho0 hook for authentication

  //Show nothing if the autho0 is loading
  if (auth0.isLoading) {
    return (<></>)
  }
  //IF the user is not authenticated then send them back to home page
  if (!auth0.isAuthenticated) return <Navigate to={"/"}/>
  //Return the layout 
  return (
    <div className={"flex-row hfill wfill"}>
      <SidebarMenu />
      <div className={"flex-col hfill wfill scroll-y"}>
        {state === 'loading' ?
          <PageLoader /> //Show the page loader 
          :
          <Outlet /> //Show the outlet
        }
      </div>
    </div>
  )
}


export default Layout;
