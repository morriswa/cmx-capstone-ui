import './Layout.component.scss';
import {Navigate, Outlet, useNavigation} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import PageLoader from "src/components/page-loader/PageLoader.component.jsx";
import {DEFAULT_LOGOUT} from "src/config/auth0.config.jsx";
import useRestClient from "src/hooks/RestClient.hook.jsx";
import {useQuery} from "@tanstack/react-query";


function SidebarMenu() {

  const auth0 = useAuth0();
  const client = useRestClient();
  const promptHistoryQ = useQuery({
    queryKey: ['history'],
    queryFn: async ()=> (await client.getUserPromptHistory()).json()
  })

  async function handleLogout() {
    await auth0.logout(DEFAULT_LOGOUT)
  }

  async function handleProfileClick() {
    return;
  }

  if (promptHistoryQ.isLoading) return <PageLoader />

  const prevPrompts = promptHistoryQ.data;
  console.log(prevPrompts);

  // TODO potentially flex this, need to extern variables...
  return (<div className={"flex-col justify-content-space-between p-1 alternate-surface-background-color"}>
    {/* Float top menu items*/}
    <div className={"flex-col gap-1"}>
      <h3>JayhawkAI</h3>

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

  const {state} = useNavigation();
  const auth0 = useAuth0();

  if (auth0.isLoading) {
    return (<></>)
  }

  if (!auth0.isAuthenticated) return <Navigate to={"/"}/>

  return (
    <div className={"flex-row hfill wfill"}>
      <SidebarMenu />
      <div className={"flex-col hfill wfill scroll-y"}>
        {state === 'loading' ?
          <PageLoader />
          :
          <Outlet />
        }
      </div>
    </div>
  )
}


export default Layout;
